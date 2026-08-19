"use client";

import React, { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactoPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [chars, setChars] = useState(0);

  // Estados controlados para validación en tiempo real
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  // Validaciones derivadas
  const isEmailValid = EMAIL_REGEX.test(email);
  const doEmailsMatch = email === confirmEmail;

  // Errores visibles condicionados a si el usuario ya interactuó con el campo
  const showEmailFormatError = emailTouched && email.length > 0 && !isEmailValid;
  const showMatchError = confirmTouched && confirmEmail.length > 0 && !doEmailsMatch;

  async function handleSubmit(formData: FormData) {
    setEmailTouched(true);
    setConfirmTouched(true);

    if (!isEmailValid || !doEmailsMatch) return;

    setStatus("loading");

    const data = {
      nombre: formData.get("nombre"),
      apellido: formData.get("apellido"),
      email: email,
      mensaje: formData.get("mensaje"),
    };

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        (document.getElementById("contact-form") as HTMLFormElement).reset();
        setEmail("");
        setConfirmEmail("");
        setEmailTouched(false);
        setConfirmTouched(false);
        setChars(0);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error al enviar:", error);
      setStatus("error");
    }
  }

  return (
    <div className="mt-[110px] pb-[100px] max-w-2xl md:mx-auto p-6 md:p-8 text-neutral-100"> {/* Añadido color de texto claro global */}
      <form 
        id="contact-form"
        action={handleSubmit} 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <p className="text-center text-lg border-b-2 border-neutral-600 md:col-span-2 mt-10">
          Contáctenos si requiere más información para un proyecto de vivienda.
        </p>

        {/* Nombre */}
        <div className="md:col-span-1">
          <label className="block mb-2 font-medium">Nombre*</label>
          <input
            name="nombre"
            type="text"
            required
            className="w-full p-3 border border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-neutral-800 text-neutral-100" // Fondo oscuro, texto claro
            placeholder="Ej: Andrea"
          />
        </div>

        {/* Apellido */}
        <div className="md:col-span-1">
          <label className="block mb-2 font-medium">Apellido*</label>
          <input
            name="apellido"
            type="text"
            required
            className="w-full p-3 border border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-neutral-800 text-neutral-100" // Fondo oscuro, texto claro
            placeholder="Ej: Muñoz"
          />
        </div>

        {/* Email */}
        <div className="md:col-span-1">
          <label className="block mb-2 font-medium">Correo Electrónico*</label>
          <input
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailTouched(true)}
            aria-invalid={showEmailFormatError}
            aria-describedby="email-error"
            className={`w-full p-3 border rounded-lg focus:ring-2 outline-none transition bg-neutral-800 text-neutral-100 ${ // Fondo oscuro, texto claro
              showEmailFormatError
                ? "border-red-500 focus:ring-red-500" // ELIMINADO bg-red-50
                : emailTouched && isEmailValid
                ? "border-green-500 focus:ring-green-500"
                : "border-neutral-600 focus:ring-blue-500" // Borde predeterminado sutil
            }`}
            placeholder="correo@ejemplo.com"
          />
          {showEmailFormatError && (
            <p id="email-error" className="text-red-500 text-xs mt-1 font-medium"> {/* Color de texto de error más legible */}
              Ingresa un formato de correo válido.
            </p>
          )}
        </div>

        {/* Confirmación Email */}
        <div className="md:col-span-1">
          <label className="block mb-2 font-medium">Confirmar Correo Electrónico*</label>
          <input
            name="confirmEmail"
            type="email"
            required
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            onBlur={() => setConfirmTouched(true)}
            onPaste={(e) => e.preventDefault()}
            aria-invalid={showMatchError}
            aria-describedby="confirm-email-error"
            className={`w-full p-3 border rounded-lg focus:ring-2 outline-none transition bg-neutral-800 text-neutral-100 ${ // Fondo oscuro, texto claro
              showMatchError
                ? "border-red-500 focus:ring-red-500" // ELIMINADO bg-red-50
                : confirmTouched && doEmailsMatch && confirmEmail.length > 0
                ? "border-green-500 focus:ring-green-500"
                : "border-neutral-600 focus:ring-blue-500" // Borde predeterminado sutil
            }`}
            placeholder="correo@ejemplo.com"
          />
          {showMatchError && (
            <p id="confirm-email-error" className="text-red-500 text-xs mt-1 font-medium"> {/* Color de texto de error más legible */}
              Los correos electrónicos no coinciden.
            </p>
          )}
        </div>

        {/* Mensaje */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-medium">
            Mensaje ({chars}/500)*
          </label>
          <textarea
            name="mensaje"
            maxLength={500}
            onChange={(e) => setChars(e.target.value.length)}
            rows={5}
            required
            className="w-full p-3 border border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none transition bg-neutral-800 text-neutral-100" // Fondo oscuro, texto claro
          ></textarea>
        </div>

        {/* Botón de envío */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={status === "loading" || (emailTouched && !isEmailValid) || (confirmTouched && !doEmailsMatch)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:bg-neutral-600 disabled:text-neutral-400 disabled:cursor-not-allowed" // Botón deshabilitado oscurecido
          >
            {status === "loading" ? "Enviando..." : "Enviar Mensaje"}
          </button>
        </div>

        {status === "success" && (
          <p className="md:col-span-2 text-green-500 font-medium text-center"> {/* Color de texto de éxito más legible */}
            Mensaje enviado con éxito, nos pondremos en contacto.
          </p>
        )}
        {status === "error" && (
          <p className="md:col-span-2 text-red-500 font-medium text-center"> {/* Color de texto de error más legible */}
            Hubo un error. Intenta de nuevo.
          </p>
        )}
      </form>

      <div>
        <p className="text-center mt-10 text-neutral-400">info@elementalchile.cl</p> {/* Color de texto más sutil */}
      </div>
    </div>
  );
}