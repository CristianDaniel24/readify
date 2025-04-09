"use client";

import type React from "react";

import { useState } from "react";
import AnimatedLabel from "./animated-label";

export default function Demo() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));

    // Simple validation for demo purposes
    if (id === "email" && value && !value.includes("@")) {
      setErrors((prev) => ({ ...prev, [id]: "Email inválido" }));
    } else if (id === "password" && value && value.length < 6) {
      setErrors((prev) => ({
        ...prev,
        [id]: "La contraseña debe tener al menos 6 caracteres",
      }));
    } else {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Labels Animados
        </h1>

        <form className="space-y-2">
          <AnimatedLabel
            id="name"
            label="Nombre"
            value={formState.name}
            onChange={handleChange}
            required
            variant="default"
            errorMessage={errors.name}
          />

          <AnimatedLabel
            id="email"
            label="Correo electrónico"
            value={formState.email}
            onChange={handleChange}
            type="email"
            required
            variant="outline"
            errorMessage={errors.email}
          />

          <AnimatedLabel
            id="password"
            label="Contraseña"
            value={formState.password}
            onChange={handleChange}
            type="password"
            required
            variant="gradient"
            errorMessage={errors.password}
          />

          <AnimatedLabel
            id="message"
            label="Mensaje"
            value={formState.message}
            onChange={handleChange}
            variant="default"
            errorMessage={errors.message}
          />

          <button
            type="button"
            className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-md hover:from-blue-600 hover:to-purple-600 transition-all"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
