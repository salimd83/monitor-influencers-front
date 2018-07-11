import format from 'date-fns/format';

export default dataObjs => {
  console.log(dataObjs);
  let dataRate = [],
    dataEngagement = [],
    labels = [];

  if (dataObjs != 'undefined') {
    dataObjs[0].forEach(dataObj => {
      labels.push(format(dataObj.date, 'D MMM'));
      dataRate.push(dataObj.count);
    });

    dataObjs[1].forEach(dataObj => {
      dataEngagement.push(dataObj.count);
    });
  }

  const maxVal = Math.max([...dataRate, ...dataEngagement]);

  return {
    chartType: 'line',
    datasets: {
      yesterday: [
        {
          label: 'Activity Rate',
          data: dataRate,
          fill: 'start'
        },
        {
          label: 'Activity Engagment',
          data: dataEngagement,
          fill: 'start'
        }
      ],
      today: [
        {
          label: 'Activity Rate',
          data: dataRate,
          fill: 'start'
        },
        {
          label: 'Activity Engagment',
          data: dataEngagement,
          fill: 'start'
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
        position: 'nearest',
        mode: 'index',
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
              fontColor: 'rgba(0,0,0,0.54)'
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
