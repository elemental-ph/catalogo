"use client";

import React, { useState } from "react";

export default function ContactoPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [chars, setChars] = useState(0);

  async function handleSubmit(formData: FormData) {
    setStatus("loading");

    // Convertimos el FormData a un objeto plano JSON
    const data = {
      nombre: formData.get("nombre"),
      apellido: formData.get("apellido"),
      email: formData.get("email"),
      mensaje: formData.get("mensaje"),
    };

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indicamos que enviamos JSON
        },
        body: JSON.stringify(data), // Serializamos el objeto
      });

      if (response.ok) {
        setStatus("success");
        (document.getElementById("contact-form") as HTMLFormElement).reset();
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
    <div className="mt-[110px] pb-[100px] max-w-2xl md:mx-auto p-6 md:p-8">

      <form 
        id="contact-form"
        action={handleSubmit} 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
       <p className="text-center border-b-2 md:col-span-3 mt-10">Contactenos para agendar una reunión</p>
        {/* Nombre */}
        <div className="md:col-span-1">
          <label className="block mb-2 font-medium">Nombre*</label>
          <input
            name="nombre"
            type="text"
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="correo@ejemplo.com"
          />
        </div>

        {/* Mensaje */}
        <div className="md:col-span-3">
          <label className="block mb-2 font-medium">
            Mensaje ({chars}/500)*
          </label>
          <textarea
            name="mensaje"
            maxLength={500}
            onChange={(e) => setChars(e.target.value.length)}
            rows={5}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          ></textarea>
        </div>

        <div className="md:col-span-3">
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:bg-gray-400"
          >
            {status === "loading" ? "Enviando..." : "Enviar Mensaje"}
          </button>
        </div>

        {status === "success" && (
          <p className="md:col-span-3 text-green-600 font-medium text-center">Mensaje enviado con éxito, nos pondremos en contacto pronto.</p>
        )}
        {status === "error" && (
          <p className="md:col-span-3 text-red-600 font-medium text-center">Hubo un error. Intenta de nuevo.</p>
        )}
      </form>
            <div>
      <p className="text-center mt-10">Los Conquistadores 1700 Piso 29-A</p>
      <p className="text-center">Providencia 7520282</p>
      <p className="text-center">Chile</p>   
      <p className="text-center">
      <a className="text-center" href="tel:+56229637500">Tel: +56 229 637 500</a>
      </p>
      </div>
    </div>
  );
}