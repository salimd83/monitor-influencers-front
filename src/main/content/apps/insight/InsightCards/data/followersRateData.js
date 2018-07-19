import format from "date-fns/format";

export default linksData => {
  console.log("followers rate data", linksData);

  const brandColors = {
    facebook: "#3b5998",
    twitter: "#1da1f2",
    instagram: "#c32aa3",
    snapchat: "#fffc00",
    youtube: "#ff0000",
    pinterest: "#bd081c",
    linkedin: "#007bb5",
    googleplus: "#db4437"
  };

  const data = [];
  const labels = [];
  let totalData = [];

  if (typeof linksData != "undefined") {
    linksData.forEach(link => {
      //get data
      console.log("followers rate looping", link);
      const obj = {
        label: link.label,
        data: link.data.map(row => row.count),
        fill: "start",
        lineColor: brandColors[link.type],
        bgColor: 'transparent'
      };
      data.push(obj);
      totalData = [...totalData, ...obj.data];

      //get labels
      link.data.forEach(({ date }) => {
        if (labels.includes(date)) return;
        labels.push(format(date, "D MMM"));
      });
    });
  }

  console.log("followers rate formated Data", data);
  console.log("followers rate total Data", data);
  console.log("followers rate labels", labels);

  // if (linksData != 'undefined') {
  //   linksData.forEach(link => {

  //   })
  // }

  // if (linksData != 'undefined') {
  //   linksData[0].forEach(dataObj => {
  //     labels.push(format(dataObj.date, 'D MMM'));
  //     dataRate.push(dataObj.count);
  //   });

  //   linksData[1].forEach(dataObj => {
  //     dataEngagement.push(dataObj.count);
  //   });
  // }

  const maxVal = Math.max(totalData);

  return {
    chartType: "line",
    datasets: {
      today: data
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
