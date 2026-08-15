'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { mockFaqs } from '../data/mockFaqs';


export default function FaqAccordion() {
  // Estado para rastrear qué pregunta está expandida
  // Si es null, todas están colapsadas.
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="w-full relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
        
        {/* Columna Izquierda: Título y Preguntas Frecuentes (Ancho) */}
        <div className="lg:col-span-2 w-full">
          {/* Título de la Sección */}
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wide">
              Preguntas Frecuentes
            </h2>
            <div className="w-24 h-1 bg-[#ED1C24] mt-4"></div>
          </div>

          {/* Acordeón de FAQs */}
          <div className="space-y-4">
            {mockFaqs.map((faq) => {
              const isOpen = openId === faq.id;

              return (
                <div
                  key={faq.id}
                  className="bg-[#131316] border border-[#26262A] rounded-xl overflow-hidden transition-all duration-300 hover:border-zinc-700/60"
                >
                  {/* Botón de la Pregunta */}
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none group select-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[#F5F4F2] text-sm md:text-base font-semibold group-hover:text-white transition-colors duration-200 pr-4">
                      {faq.question}
                    </span>
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full border border-zinc-700/60 flex items-center justify-center bg-zinc-900 group-hover:border-zinc-500 transition-colors duration-200">
                        <ChevronDown
                          size={18}
                          className={`text-zinc-400 group-hover:text-white transition-transform duration-300 ${
                            isOpen ? 'transform rotate-180' : ''
                          }`}
                        />
                      </div>
                    </div>
                  </button>

                  {/* Contenedor Animado de la Respuesta */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="p-5 md:p-6 pt-0 md:pt-0 border-t border-zinc-800/40 text-zinc-400 text-sm md:text-base leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Columna Derecha: Mascota (Zorrito) */}
        <div className="lg:col-span-1 flex justify-center lg:justify-start items-start w-full pt-24">
          <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[350px] md:h-[350px] transition-transform duration-500 hover:scale-105 drop-shadow-[0_0_30px_rgba(237,28,36,0.45)] hover:drop-shadow-[0_0_45px_rgba(237,28,36,0.7)]">
            <Image
              src="/images/mascota-duda.png"
              alt="Mascota SupplyMentum"
              fill
              className="object-contain brightness-110"
              sizes="(max-width: 768px) 280px, 350px"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}
