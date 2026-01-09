"use client";

import React, { useState, useRef } from "react";

// --- CONFIGURACIÓN DE LÍMITE ---
const MAX_SIZE_MB = 20; 
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export default function ContactoPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [chars, setChars] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cálculo de tamaño total
  const totalSizeBytes = files.reduce((acc, file) => acc + file.size, 0);
  const totalSizeMB = (totalSizeBytes / (1024 * 1024)).toFixed(2);
  const isLimitReached = totalSizeBytes >= MAX_SIZE_BYTES;

  // Formateador de peso de archivo
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  // Lógica central de validación de archivos
  const validateAndAddFiles = (incomingFiles: File[]) => {
    let currentSize = totalSizeBytes;
    const addedFiles: File[] = [];

    for (const file of incomingFiles) {
      if (currentSize + file.size <= MAX_SIZE_BYTES) {
        addedFiles.push(file);
        currentSize += file.size;
      } else {
        alert(`El archivo "${file.name}" supera el límite de ${MAX_SIZE_MB}MB totales.`);
      }
    }
    setFiles((prev) => [...prev, ...addedFiles]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isLimitReached) setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (isLimitReached) return;
    if (e.dataTransfer.files) {
      validateAndAddFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      validateAndAddFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  async function handleSubmit(formData: FormData) {
    setStatus("loading");
    formData.delete("archivos");
    files.forEach((file) => formData.append("archivos", file));

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        body: formData, 
      });

      if (response.ok) {
        setStatus("success");
        (document.getElementById("contact-form") as HTMLFormElement).reset();
        setFiles([]);
        setChars(0);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  }

  return (
    <div className="mt-[110px] pb-[100px] max-w-2xl md:mx-auto p-6 md:p-8">
      <form id="contact-form" action={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Nombre y Apellido */}
        <div>
          <label className="block mb-2 font-medium text-white">Nombre</label>
          <input name="nombre" type="text" required className="w-full p-3 border rounded-lg outline-none" placeholder="Ej: Juan" />
        </div>
        <div>
          <label className="block mb-2 font-medium text-white">Apellido</label>
          <input name="apellido" type="text" required className="w-full p-3 border rounded-lg outline-none" placeholder="Ej: Pérez" />
        </div>

        {/* Email*/}
        <div className="md:col-span-1">
          <label className="block mb-2 font-medium text-white">Correo Electrónico</label>
          <input name="email" type="email" required className="w-full p-3 border rounded-lg outline-none" placeholder="correo@ejemplo.com" />
        </div>


        {/* Dropdown Tipo de Cliente */}
        <div className="md:col-span-3">
          <label className="block mb-2 font-medium text-white">A quien representas</label>
          <select name="tipo_cliente" required className="w-full p-3 border border-white rounded-lg text-gray-300">
            <option className="text-black" value="">Selecciona una opción</option>
            <option className="text-black" value="comite">Comité de Vivienda</option>
            <option className="text-black" value="municipio">Municipio</option>
            <option className="text-black" value="EP">EP (Entidad Patrocinante)</option>
            <option className="text-black" value="constructora">Constructora</option>
            <option className="text-black" value="particular">Particular</option>
          </select>
        </div>

        {/* Email*/}
        <div className="md:col-span-3">
          <label className="block mb-2 font-medium text-white">Asunto</label>
          <input name="asunto" type="text" required className="w-full p-3 border rounded-lg outline-none" />
        </div>

        {/* Mensaje */}
        <div className="md:col-span-3">
          <label className="block mb-2 font-medium text-white">Mensaje ({chars}/500)</label>
          <textarea
            name="mensaje"
            required
            maxLength={500}
            onChange={(e) => setChars(e.target.value.length)}
            rows={4}
            className="w-full p-3 border rounded-lg outline-none resize-none"
          ></textarea>
        </div>

        {/* Zona Drag n Drop */}
        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium text-white">Documentos del terreno (opcional)</label>
            <span className={`text-xs font-bold ${isLimitReached ? "text-red-500" : "text-gray-400"}`}>
              {totalSizeMB} MB / {MAX_SIZE_MB} MB
            </span>
          </div>
          
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !isLimitReached && fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              isLimitReached 
                ? "border-red-900 bg-red-900/10 cursor-not-allowed" 
                : isDragging ? "border-blue-500 bg-blue-500/10" : "border-white hover:border-blue-400 cursor-pointer"
            }`}
          >
            <input
              type="file"
              multiple
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              accept=".pdf,image/*"
              disabled={isLimitReached}
            />
            <p className={`${isLimitReached ? "text-red-400" : "text-gray-400"}`}>
              {isLimitReached 
                ? "Límite de capacidad alcanzado" 
                : isDragging ? "Suelta los archivos ahora" : "Arrastra tus archivos o haz clic"}
            </p>
          </div>

          {/* Lista de archivos con peso individual */}
          {files.length > 0 && (
            <ul className="mt-4 space-y-2">
              {files.map((file, index) => (
                <li key={index} className="flex items-center justify-between p-2 bg-gray-800/50 rounded border border-gray-700 text-sm">
                  <div className="flex flex-col truncate max-w-[80%]">
                    <span className="truncate text-white">{file.name}</span>
                    <span className="text-[10px] text-gray-400">{formatFileSize(file.size)}</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                    className="text-red-400 hover:text-red-300 font-bold px-2 text-lg"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="md:col-span-3">
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 cursor-pointer rounded-lg font-semibold transition disabled:bg-gray-600"
          >
            {status === "loading" ? "Enviando..." : "Enviar Mensaje"}
          </button>
        </div>

        {status === "success" && <p className="md:col-span-2 text-green-500 font-medium text-center">¡Mensaje enviado con éxito! te contactaremos.</p>}
        {status === "error" && <p className="md:col-span-2 text-red-500 font-medium text-center">Hubo un error al enviar.</p>}
      </form>
    </div>
  );
}