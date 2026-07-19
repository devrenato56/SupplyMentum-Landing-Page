"use client";

import { useState } from "react";
import { CheckCircle2, AlertTriangle, Send, Sparkles, X, FileText } from "lucide-react";

interface ApplicationFormProps {
  isConvocatoriaActive: boolean;
  preselectedArea?: string;
}

export default function ApplicationForm({
  isConvocatoriaActive,
  preselectedArea = "",
}: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    codigo: "",
    carrera: "",
    ciclo: "4to Ciclo",
    area1: preselectedArea || "Operaciones & Logística",
    area2: "Marketing & Contenidos",
    motivacion: "",
    cvUrl: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const areasList = [
    "Operaciones & Logística",
    "Marketing & Contenidos",
    "Gestión del Talento",
    "Relaciones Corporativas",
    "Proyectos & Consultoría",
    "Innovación & Tecnología",
  ];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre completo es obligatorio";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.correo.trim()) {
      newErrors.correo = "El correo electrónico es obligatorio";
    } else if (!emailRegex.test(formData.correo)) {
      newErrors.correo = "Ingresa un correo electrónico válido (ejemplo@uni.edu.pe)";
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El número de teléfono/WhatsApp es obligatorio";
    } else if (formData.telefono.length < 8) {
      newErrors.telefono = "Ingresa un número de teléfono válido";
    }

    if (!formData.codigo.trim()) {
      newErrors.codigo = "El código UNI o de estudiante es obligatorio";
    }

    if (!formData.carrera.trim()) {
      newErrors.carrera = "La especialidad o carrera es obligatoria";
    }

    if (formData.area1 === formData.area2) {
      newErrors.area2 = "La segunda opción debe ser distinta a la primera";
    }

    if (!formData.motivacion.trim()) {
      newErrors.motivacion = "Por favor explica brevemente tu motivación";
    } else if (formData.motivacion.trim().length < 20) {
      newErrors.motivacion = "La motivación debe tener al menos 20 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!isConvocatoriaActive) {
      setSubmitError("La convocatoria está deshabilitada en este momento.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Frontend submission simulation (Ready to connect with backend API)
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (err) {
      setIsSubmitting(false);
      setSubmitError("Ocurrió un error al enviar tu postulación. Intenta nuevamente.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <section
      id="postula"
      className="w-full py-20 bg-[#0A0A0C] border-t border-zinc-900 scroll-mt-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Tag */}
        <div className="flex items-center gap-2 mb-3 justify-center">
          <div className="w-6 h-0.5 bg-[#ED1C24]" />
          <span className="text-xs font-extrabold tracking-widest text-[#ED1C24] uppercase">
            POSTULACIÓN OFICIAL
          </span>
          <div className="w-6 h-0.5 bg-[#ED1C24]" />
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
            Formulario de Postulación
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
            Completa tus datos con atención. El proceso toma menos de 3 minutos.
          </p>
        </div>

        {/* If Convocatoria is disabled (RF-22 / RF-23) */}
        {!isConvocatoriaActive && (
          <div className="p-8 bg-zinc-900/60 border border-zinc-800 text-center rounded-none shadow-xl mb-8">
            <AlertTriangle size={36} className="text-zinc-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-zinc-300 mb-2">
              Convocatoria Deshabilitada
            </h3>
            <p className="text-sm text-zinc-400 max-w-lg mx-auto">
              Actualmente el periodo de recepción de postulaciones está cerrado. Las vacantes se actualizarán cuando la junta directiva habilite el nuevo proceso.
            </p>
          </div>
        )}

        {/* Submitted Confirmation State (RF-26) */}
        {isSubmitted ? (
          <div className="bg-[#121216] border border-red-900/50 p-8 sm:p-12 text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-red-950/60 border border-red-600/40 rounded-full flex items-center justify-center mx-auto mb-6 text-[#ED1C24]">
              <CheckCircle2 size={36} />
            </div>
            <span className="inline-block px-3 py-1 bg-red-950/40 text-[#ED1C24] text-xs font-extrabold uppercase tracking-widest mb-3">
              ¡POSTULACIÓN RECIBIDA!
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
              ¡Gracias por postular, {formData.nombre}!
            </h3>
            <p className="text-zinc-300 text-sm sm:text-base max-w-xl mx-auto mb-6 leading-relaxed">
              Hemos registrado tu información en nuestra base de datos. Se ha enviado una confirmación a{" "}
              <strong className="text-white">{formData.correo}</strong>.
            </p>
            <div className="bg-zinc-900/80 border border-zinc-800 p-5 max-w-md mx-auto text-left text-xs text-zinc-400 space-y-2 mb-8">
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span>Área (Primera Opción):</span>
                <span className="text-white font-bold">{formData.area1}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span>Área (Segunda Opción):</span>
                <span className="text-white font-bold">{formData.area2}</span>
              </div>
              <div className="flex justify-between">
                <span>Código UNI:</span>
                <span className="text-white font-bold">{formData.codigo}</span>
              </div>
            </div>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  nombre: "",
                  correo: "",
                  telefono: "",
                  codigo: "",
                  carrera: "",
                  ciclo: "4to Ciclo",
                  area1: "Operaciones & Logística",
                  area2: "Marketing & Contenidos",
                  motivacion: "",
                  cvUrl: "",
                });
              }}
              className="px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-extrabold text-xs uppercase tracking-wider transition-colors"
            >
              Enviar otra postulación
            </button>
          </div>
        ) : (
          /* Active Form */
          <form
            onSubmit={handleSubmit}
            className={`bg-[#121216] border border-zinc-800 p-6 sm:p-10 shadow-2xl space-y-6 transition-all ${
              !isConvocatoriaActive ? "opacity-40 pointer-events-none" : ""
            }`}
          >
            {submitError && (
              <div className="p-4 bg-red-950/60 border border-red-800 text-red-300 text-xs font-semibold flex items-center gap-2">
                <AlertTriangle size={16} />
                <span>{submitError}</span>
              </div>
            )}

            {/* Row 1: Nombre & Correo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ej. Juan Carlos Pérez Flores"
                  className={`w-full bg-[#0A0A0C] border ${
                    errors.nombre ? "border-red-600" : "border-zinc-800"
                  } focus:border-[#ED1C24] focus:outline-none px-4 py-3 text-sm text-white placeholder-zinc-600 transition-colors`}
                />
                {errors.nombre && (
                  <p className="mt-1 text-xs text-red-500 font-medium">{errors.nombre}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  Correo Electrónico (UNI / Personal) *
                </label>
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  placeholder="Ej. jperezf@uni.pe"
                  className={`w-full bg-[#0A0A0C] border ${
                    errors.correo ? "border-red-600" : "border-zinc-800"
                  } focus:border-[#ED1C24] focus:outline-none px-4 py-3 text-sm text-white placeholder-zinc-600 transition-colors`}
                />
                {errors.correo && (
                  <p className="mt-1 text-xs text-red-500 font-medium">{errors.correo}</p>
                )}
              </div>
            </div>

            {/* Row 2: Teléfono, Código & Carrera */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  Teléfono / WhatsApp *
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Ej. 987654321"
                  className={`w-full bg-[#0A0A0C] border ${
                    errors.telefono ? "border-red-600" : "border-zinc-800"
                  } focus:border-[#ED1C24] focus:outline-none px-4 py-3 text-sm text-white placeholder-zinc-600 transition-colors`}
                />
                {errors.telefono && (
                  <p className="mt-1 text-xs text-red-500 font-medium">{errors.telefono}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  Código UNI / Estudiante *
                </label>
                <input
                  type="text"
                  name="codigo"
                  value={formData.codigo}
                  onChange={handleChange}
                  placeholder="Ej. 20230145A"
                  className={`w-full bg-[#0A0A0C] border ${
                    errors.codigo ? "border-red-600" : "border-zinc-800"
                  } focus:border-[#ED1C24] focus:outline-none px-4 py-3 text-sm text-white placeholder-zinc-600 transition-colors`}
                />
                {errors.codigo && (
                  <p className="mt-1 text-xs text-red-500 font-medium">{errors.codigo}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  Carrera / Especialidad *
                </label>
                <input
                  type="text"
                  name="carrera"
                  value={formData.carrera}
                  onChange={handleChange}
                  placeholder="Ej. Ingeniería Industrial"
                  className={`w-full bg-[#0A0A0C] border ${
                    errors.carrera ? "border-red-600" : "border-zinc-800"
                  } focus:border-[#ED1C24] focus:outline-none px-4 py-3 text-sm text-white placeholder-zinc-600 transition-colors`}
                />
                {errors.carrera && (
                  <p className="mt-1 text-xs text-red-500 font-medium">{errors.carrera}</p>
                )}
              </div>
            </div>

            {/* Row 3: Área 1 & Área 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  Primera Opción de Área *
                </label>
                <select
                  name="area1"
                  value={formData.area1}
                  onChange={handleChange}
                  className="w-full bg-[#0A0A0C] border border-zinc-800 focus:border-[#ED1C24] focus:outline-none px-4 py-3 text-sm text-white transition-colors cursor-pointer"
                >
                  {areasList.map((a) => (
                    <option key={a} value={a} className="bg-zinc-900 text-white">
                      {a}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  Segunda Opción de Área *
                </label>
                <select
                  name="area2"
                  value={formData.area2}
                  onChange={handleChange}
                  className={`w-full bg-[#0A0A0C] border ${
                    errors.area2 ? "border-red-600" : "border-zinc-800"
                  } focus:border-[#ED1C24] focus:outline-none px-4 py-3 text-sm text-white transition-colors cursor-pointer`}
                >
                  {areasList.map((a) => (
                    <option key={a} value={a} className="bg-zinc-900 text-white">
                      {a}
                    </option>
                  ))}
                </select>
                {errors.area2 && (
                  <p className="mt-1 text-xs text-red-500 font-medium">{errors.area2}</p>
                )}
              </div>
            </div>

            {/* Row 4: Motivación */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                ¿Por qué quieres unirte a SupplyMentum y qué esperas aportar? *
              </label>
              <textarea
                name="motivacion"
                rows={4}
                value={formData.motivacion}
                onChange={handleChange}
                placeholder="Cuéntanos brevemente sobre tus intereses, proyectos o motivación para sumarte al centro..."
                className={`w-full bg-[#0A0A0C] border ${
                  errors.motivacion ? "border-red-600" : "border-zinc-800"
                } focus:border-[#ED1C24] focus:outline-none px-4 py-3 text-sm text-white placeholder-zinc-600 transition-colors`}
              />
              {errors.motivacion && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.motivacion}</p>
              )}
            </div>

            {/* Row 5: Link a CV / LinkedIn */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                Enlace a CV o Perfil de LinkedIn (Opcional)
              </label>
              <input
                type="url"
                name="cvUrl"
                value={formData.cvUrl}
                onChange={handleChange}
                placeholder="https://drive.google.com/file/... o https://linkedin.com/in/..."
                className="w-full bg-[#0A0A0C] border border-zinc-800 focus:border-[#ED1C24] focus:outline-none px-4 py-3 text-sm text-white placeholder-zinc-600 transition-colors"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || !isConvocatoriaActive}
                className={`w-full py-4 px-8 text-xs font-extrabold tracking-widest uppercase text-white flex items-center justify-center gap-2 transition-all shadow-xl ${
                  isConvocatoriaActive
                    ? "bg-[#ED1C24] hover:bg-red-600 active:scale-[0.99] shadow-red-600/20"
                    : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <span>Procesando envíos...</span>
                ) : (
                  <>
                    <Send size={16} /> Enviar Mi Postulación
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
