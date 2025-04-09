"use client";

import ChartVentas from "@/app/home/marketing/_components/chart-ventas";

function App() {
  return (
    <div>
      <h1 className="font-bold text-2xl">Grafico de ventas mensuales</h1>

      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <ChartVentas />
      </div>
    </div>
  );
}

export default App;
