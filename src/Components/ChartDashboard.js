import React, { useEffect } from "react";
import { Chart, registerables } from "chart.js";

const ChartDashboard = () => {
  useEffect(() => {
    // Registrar todos los componentes necesarios para Chart.js
    Chart.register(...registerables);

    // Configuración del gráfico
    const ctx = document.getElementById("chartjs-dashboard-line").getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 225);
    gradient.addColorStop(0, "rgba(215, 227, 244, 1)");
    gradient.addColorStop(1, "rgba(215, 227, 244, 0)");

    // Verificar si existe un gráfico previo y destruirlo
    if (window.chartInstance) {
      window.chartInstance.destroy();
    }

    // Crear el gráfico
    window.chartInstance = new Chart(ctx, {
      type: "line", // Especificar el tipo de gráfico
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Sales ($)",
            fill: true,
            backgroundColor: gradient,
            borderColor: "#4e73df",  // Color del borde definido directamente
            data: [
              2115, 1562, 1584, 1892, 1587, 1923, 2566, 2448, 2805, 3438, 2917, 3327
            ]
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          intersect: false
        },
        hover: {
          intersect: true
        },
        plugins: {
          filler: {
            propagate: false
          }
        },
        scales: {
          x: {
            type: "category",
            reverse: true,
            grid: {
              color: "rgba(0,0,0,0.0)"
            }
          },
          y: {
            ticks: {
              stepSize: 1000
            },
            display: true,
            borderDash: [3, 3],
            grid: {
              color: "rgba(0,0,0,0.0)"
            }
          }
        }
      }
    });

    // Limpiar el gráfico al desmontar el componente
    return () => {
      if (window.chartInstance) {
        window.chartInstance.destroy();
      }
    };
  }, []);

  return (
    <div className="col-xl-6 col-xxl-7">
      <div className="card flex-fill w-100">
        <div className="card-header">
          <h5 className="card-title mb-0">Recent Movement</h5>
        </div>
        <div className="card-body py-3">
          <div className="chart chart-sm">
            <canvas id="chartjs-dashboard-line"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartDashboard;
