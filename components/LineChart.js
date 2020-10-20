import "react";
import ChartistGraph from "react-chartist";
import "../node_modules/chartist/dist/chartist.css";

function LineChart({ stories }) {
  const data = {
    labels: stories.map((story) => story.id),
    series: [stories.map((story) => story.points + story.ownPoints)],
  };

  const type = "Line";

  const options = {
    fullWidth: true,
    chartPadding: {
      right: 40,
    },
  };

  return (
    <div className="h-64 my-12">
      <style jsx global>{`
        svg.ct-chart-bar,
        svg.ct-chart-line {
          overflow: visible;
        }
        .ct-label.ct-label.ct-horizontal.ct-end {
          position: relative;
          justify-content: flex-end;
          text-align: right;
          transform-origin: 100% 0;
          transform: translate(-100%) rotate(-45deg);
          white-space: nowrap;
        }
      `}</style>

      <ChartistGraph data={data} options={options} type={type} />
    </div>
  );
}

export default LineChart;
