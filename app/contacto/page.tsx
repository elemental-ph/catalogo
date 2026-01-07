"use client";

import React, { useState } from "react";

export default function ContactoPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [chars, setChars] = useState(0);

  async function handleSubmit(formData: FormData) {
    setStatus("loading");
    
    // Aquí llamaríamos a nuestra Server Action
    const response = await fetch("/api/send", {
      method: "POST",
      body: JSON.stringify({
        nombre: formData.get("nombre"),
        apellido: formData.get("apellido"),
        email: formData.get("email"),
        asunto: formData.get("asunto"),
        mensaje: formData.get("mensaje"),
      }),
    });

    if (response.ok) {
      setStatus("success");
      (document.getElementById("contact-form") as HTMLFormElement).reset();
      setChars(0);
    } else {
      setStatus("error");
    }
  }

  return (
    <div className="mt-[110px] pb-[100px] max-w-2xl md:mx-auto p-6 md:p-8">

      
      <form 
        id="contact-form"
        action={handleSubmit} 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Nombre */}
        <div>
          <label className="block mb-2">Nombre</label>
          <input
            name="nombre"
            type="text"
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Ej: Juan"
          />
        </div>

        {/* Apellido */}
        <div>
          <label className="block mb-2">Apellido</label>
          <input
            name="apellido"
            type="text"
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Ej: Pérez"
          />
        </div>

        {/* Email con Validación */}
        <div className="md:col-span-2">
          <label className="block mb-2">Correo Electrónico</label>
          <input
            name="email"
            type="email"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="correo@ejemplo.com"
          />
        </div>

        {/* Asunto */}
        <div className="md:col-span-2">
          <label className="block mb-2">Asunto</label>
          <input
            name="asunto"
            type="text"
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Mensaje con Contador */}
        <div className="md:col-span-2">
          <label className="block mb-2">
            Mensaje ({chars}/500)
          </label>
          <textarea
            name="mensaje"
            required
            maxLength={500}
            onChange={(e) => setChars(e.target.value.length)}
            rows={5}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          ></textarea>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:bg-gray-400"
          >
            {status === "loading" ? "Enviando..." : "Enviar Mensaje"}
          </button>
        </div>

        {/* Mensajes de Estado */}
        {status === "success" && (
          <p className="md:col-span-2 text-green-600 font-medium">¡Mensaje enviado con éxito!</p>
        )}
        {status === "error" && (
          <p className="md:col-span-2 text-red-600 font-medium">Hubo un error. Intenta de nuevo.</p>
        )}
      </form>
    </div>
  );
}