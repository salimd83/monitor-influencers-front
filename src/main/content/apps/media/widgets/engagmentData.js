import format from "date-fns/format";

export default dataObjs => {
  let dataComments = [],
    dataReactions = [],
    dataViews = [],
    labels = [];

  if (typeof dataObjs != "undefined") {
    dataObjs.forEach(dataObj => {
      labels.push(format(dataObj.date, "D MMM"));
      dataViews.push(dataObj.views);
      dataComments.push(dataObj.comments);
      dataReactions.push(dataObj.reactions);
    });
  }

  const maxVal = Math.max([...dataComments, ...dataReactions, ...dataViews]);

  return {
    chartType: "line",
    datasets: {
      today: [
        {
          label: "Views",
          data: dataViews,
          fill: "start",
          lineColor: "#55c39e",
          bgColor: "#55c39e"
        },
        {
          label: "Commnents",
          data: dataComments,
          fill: "start",
          lineColor: "#387ca3",
          bgColor: "#387ca3"
        },
        {
          label: "Reactions",
          data: dataReactions,
          fill: "start",
          lineColor: "#387ca3",
          bgColor: "#387ca3"
        }
      ]
    },
    labels,
    options: {
      spanGaps: false,
      legend: {
        display: false
      },
      maintainAspectRatio: false,
      tooltips: {
        position: "nearest",
        mode: "index",
        intersect: false
      },
      layout: {
        padding: {
          left: 24,
          right: 32
        }
      },
      elements: {
        point: {
          radius: 4,
          borderWidth: 2,
          hoverRadius: 4,
          hoverBorderWidth: 2
        }
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false
            },
            ticks: {
              fontColor: "rgba(0,0,0,0.54)"
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              tickMarkLength: 16
            },
            ticks: {
              stepSize: maxVal
            }
          }
        ]
      },
      plugins: {
        filler: {
          propagate: false
        }
      }
    }
  };
};
