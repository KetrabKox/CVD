// chartOptions.js
export function getChartOptions(currentName: string) {
  return {
    responsive: true,
    scales: {
      x: {
        grid: {
          color: "transparent",
        },
        ticks: {
          color: "gray",
        },
      },
      y: {
        border: {
          display: false,
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: "#ffffff",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `${currentName}/PLN`,
        color: "#ffffff",
        font: {
          size: 20,
        },
      },
    },
  };
}
