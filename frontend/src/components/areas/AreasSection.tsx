"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { Area } from "@/data/areasData";
import NetworkBackground from "@/components/home/NetworkBackground";
import Cube3D from "@/components/home/Cube3D";

interface AreasSectionProps {
  initialAreas: Area[];
}

export default function AreasSection({ initialAreas }: AreasSectionProps) {
  const wheelRef = useRef<HTMLDivElement>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const currentIdxRef = useRef(0);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  
  // Animation state (refs are used for high-frequency updates without re-renders)
  const angleRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);
  const movedRef = useRef(0);

  const FRONT = Math.PI / 2;
  const N = initialAreas.length;
  const STEP = (Math.PI * 2) / N;
  const RX = 38; // Radios de la elipse, en % del contenedor
  const RY = 25;

  const [displayIdx, setDisplayIdx] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (currentIdx === displayIdx) return;
    
    setIsFading(true);
    const timeout = setTimeout(() => {
      setDisplayIdx(currentIdx);
      setIsFading(false);
    }, 200);
    
    return () => clearTimeout(timeout);
  }, [currentIdx, displayIdx]);

  const displayArea = initialAreas[displayIdx];

  const goTo = useCallback((i: number) => {
    const want = FRONT - i * STEP;
    let diff = (want - targetRef.current) % (Math.PI * 2);
    if (diff > Math.PI) diff -= Math.PI * 2;
    if (diff < -Math.PI) diff += Math.PI * 2;
    targetRef.current += diff;
  }, [FRONT, STEP]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const layout = () => {
      let front = 0;
      let best = -Infinity;
      
      nodeRefs.current.forEach((el, i) => {
        if (!el) return;
        const th = angleRef.current + i * STEP;
        const depth = (Math.sin(th) + 1) / 2; // 0 atrás · 1 adelante
        
        el.style.left = `${50 + RX * Math.cos(th)}%`;
        el.style.top = `${50 + RY * Math.sin(th)}%`;
        el.style.transform = `scale(${(0.62 + depth * 0.48).toFixed(3)})`;
        el.style.opacity = (0.4 + depth * 0.6).toFixed(3);
        el.style.zIndex = Math.round(depth * 100).toString();

        if (depth > best) {
          best = depth;
          front = i;
        }
      });

      nodeRefs.current.forEach((el, i) => {
        if (!el) return;
        const on = i === front;
        el.classList.toggle('is-active', on);
        el.setAttribute('aria-pressed', on ? 'true' : 'false');
      });

      if (currentIdxRef.current !== front) {
        currentIdxRef.current = front;
        setCurrentIdx(front);
      }
    };

    const loop = () => {
      const d = targetRef.current - angleRef.current;
      if (Math.abs(d) > 1e-4) {
        angleRef.current += d * 0.11;
        layout();
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    // Inicializar posición
    goTo(0);
    angleRef.current = FRONT; // Forzamos inmediatamente para evitar animación inicial de -90deg a 90deg
    layout();
    
    if (!reduced) {
      rafRef.current = requestAnimationFrame(loop);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [STEP, FRONT]); // goTo es estable gracias a useCallback, no repite el efecto incesantemente.

  // Pointer Events for dragging
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastXRef.current = e.clientX;
    movedRef.current = 0;
    // Removed setPointerCapture to allow onClick to fire on child nodes
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    movedRef.current += Math.abs(dx);
    targetRef.current += dx * 0.009;
    angleRef.current += dx * 0.009;
    
    // Mutar DOM directamente para 60fps sin bloquear React
    let front = 0;
    let best = -Infinity;
    nodeRefs.current.forEach((el, i) => {
      if (!el) return;
      const th = angleRef.current + i * STEP;
      const depth = (Math.sin(th) + 1) / 2;
      el.style.left = `${50 + RX * Math.cos(th)}%`;
      el.style.top = `${50 + RY * Math.sin(th)}%`;
      el.style.transform = `scale(${(0.62 + depth * 0.48).toFixed(3)})`;
      el.style.opacity = (0.4 + depth * 0.6).toFixed(3);
      el.style.zIndex = Math.round(depth * 100).toString();
      if (depth > best) {
        best = depth;
        front = i;
      }
    });

    nodeRefs.current.forEach((el, i) => {
      if (!el) return;
      const on = i === front;
      el.classList.toggle('is-active', on);
      el.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    if (currentIdxRef.current !== front) {
      currentIdxRef.current = front;
      setCurrentIdx(front);
    }
  };

  const release = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const raw = (FRONT - targetRef.current) / STEP;
    goTo(((Math.round(raw) % N) + N) % N);
  };

  const handlePointerUpOrCancel = () => release();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      goTo((currentIdx + 1) % N);
      e.preventDefault();
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      goTo((currentIdx - 1 + N) % N);
      e.preventDefault();
    }
  };

  return (
    <>
      <NetworkBackground />
      <section className="section" style={{ paddingBlock: "clamp(48px,6vw,90px)" }}>
        <div className="wrap areas-inner">
          <div
            className="wheel"
            id="wheel"
            role="group"
            aria-label="Selector de áreas. Usa las flechas o arrastra para girar."
            tabIndex={0}
            ref={wheelRef}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUpOrCancel}
            onPointerCancel={handlePointerUpOrCancel}
          >
            <div className="wheel-track" aria-hidden="true"></div>
            <div className="wheel-core" id="wheel-core" aria-hidden="true">
              <Cube3D 
                size={1.5} 
                turnsPerMin={3.2} 
                interactive={false} 
                camZ={6.6} 
                fallbackSrc="/assets/cubo.png" 
                fallbackAlt="Logo cubo" 
              />
            </div>
            
            {initialAreas.map((area, i) => {
              const isActive = i === currentIdx;
              return (
                <button
                  key={area.id}
                  ref={(el) => {
                    nodeRefs.current[i] = el;
                  }}
                  type="button"
                  className={`node ${isActive ? 'is-active' : ''}`}
                  aria-label={area.name}
                  aria-pressed={isActive}
                  onClick={(e) => {
                    if (movedRef.current > 6) {
                      e.stopPropagation();
                      e.preventDefault();
                    } else {
                      goTo(i);
                    }
                  }}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    {area.iconPaths.map((d, index) => (
                      <path key={index} d={d} strokeLinecap="round" strokeLinejoin="round" />
                    ))}
                  </svg>
                </button>
              );
            })}
          </div>

          <div className="area-panel">
            <p className="eyebrow">Nuestras áreas</p>
            <div className={`area-fade ${isFading ? 'is-out' : ''}`} id="area-content">
              <h2 className="display" id="area-name">{displayArea.name}</h2>
              <p className="lede" id="area-desc">{displayArea.desc}</p>
              <div className="area-lists">
                <div className="area-list">
                  <h4>Qué realizamos</h4>
                  <ul id="area-do">
                    {displayArea.realizamos.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="area-list is-seek">
                  <h4>Qué buscamos</h4>
                  <ul id="area-seek">
                    {displayArea.buscamos.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <Link 
                href={`/areas/${displayArea.id}`} 
                className="btn btn-primary" 
                id="area-link"
              >
                Descubre más →
              </Link>
            </div>
            <p className="wheel-hint">
              <span aria-hidden="true">↔</span> Arrastra, usa las flechas o haz clic en un área
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
