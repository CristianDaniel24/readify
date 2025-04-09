"use client";

import AnimatedButton from "./animated-button";

export default function Demo() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-b from-slate-50 to-slate-200 p-4 dark:from-slate-900 dark:to-slate-800">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
        Botones Animados con Sombra
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-lg font-medium text-slate-700 dark:text-slate-200">
            Estilo Predeterminado
          </h2>
          <AnimatedButton>Botón Predeterminado</AnimatedButton>
        </div>

        <div className="flex flex-col items-center gap-2">
          <h2 className="text-lg font-medium text-slate-700 dark:text-slate-200">
            Estilo Gradiente
          </h2>
          <AnimatedButton variant="gradient">Botón Gradiente</AnimatedButton>
        </div>

        <div className="flex flex-col items-center gap-2">
          <h2 className="text-lg font-medium text-slate-700 dark:text-slate-200">
            Tamaño Pequeño
          </h2>
          <AnimatedButton size="sm">Botón Pequeño</AnimatedButton>
        </div>

        <div className="flex flex-col items-center gap-2">
          <h2 className="text-lg font-medium text-slate-700 dark:text-slate-200">
            Tamaño Grande
          </h2>
          <AnimatedButton size="lg" variant="gradient">
            Botón Grande
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
}
