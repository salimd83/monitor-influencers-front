export default dataObjs => {
  let data = [],
    labels = [];
  dataObjs.forEach(dataObj => {
    labels.push(dataObj.type);
    data.push(dataObj.count);
  });
  
  return {
    chartType: "line",
    datasets : {
      "yesterday": [
        {
          label: "Visitors",
          data : [190, 300, 340, 220, 290, 390, 250, 380, 410, 380, 320, 290],
          fill : "start"
        },
        {
          label: "Page views",
          data : [2200, 2900, 3900, 2500, 3800, 3200, 2900, 1900, 3000, 3400, 4100, 3800],
          fill : "start"
        }
      ],
      "today"    : [
        {
          label: "Visitors",
          data : [410, 380, 320, 290, 190, 390, 250, 380, 300, 340, 220, 290],
          fill : "start"
        },
        {
          label: "Page Views",
          data : [3000, 3400, 4100, 3800, 2200, 3200, 2900, 1900, 2900, 3900, 2500, 3800],
          fill : "start"
        }
      ]
    },
    labels   : ["12am", "2am", "4am", "6am", "8am", "10am", "12pm", "2pm", "4pm", "6pm", "8pm", "10pm"],
    options  : {
      spanGaps           : false,
      legend             : {
        display: false
      },
      maintainAspectRatio: false,
      tooltips           : {
        position : "nearest",
        mode     : "index",
        intersect: false
      },
      layout             : {
        padding: {
          left : 24,
          right: 32
        }
      },
      elements           : {
        point: {
          radius          : 4,
          borderWidth     : 2,
          hoverRadius     : 4,
          hoverBorderWidth: 2
        }
      },
      scales             : {
        xAxes: [
          {
            gridLines: {
              display: false
            },
            ticks    : {
              fontColor: "rgba(0,0,0,0.54)"
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              tickMarkLength: 16
            },
            ticks    : {
              stepSize: 1000
            }
          }
        ]
      },
      plugins            : {
        filler: {
          propagate: false
        }
      }
    }
  };
};
