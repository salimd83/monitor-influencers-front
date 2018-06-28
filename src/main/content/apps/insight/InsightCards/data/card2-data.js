export default () => {
  return {
    impressions: {
      value: '87k',
      ofTarget: 12
    },
    chartType: 'line',
    datasets: [
      {
        label: 'Impression',
        data: [
          67000,
          54000,
          82000,
          57000,
          72000,
          57000,
          87000,
          72000,
          89000,
          98700,
          112000,
          136000,
          110000,
          149000,
          98000
        ],
        fill: false
      }
    ],
    labels: [
      'Jan 1',
      'Jan 2',
      'Jan 3',
      'Jan 4',
      'Jan 5',
      'Jan 6',
      'Jan 7',
      'Jan 8',
      'Jan 9',
      'Jan 10',
      'Jan 11',
      'Jan 12',
      'Jan 13',
      'Jan 14',
      'Jan 15'
    ],
    options: {
      spanGaps: false,
      legend: {
        display: false
      },
      maintainAspectRatio: false,
      elements: {
        point: {
          radius: 2,
          borderWidth: 1,
          hoverRadius: 2,
          hoverBorderWidth: 1
        },
        line: {
          tension: 0
        }
      },
      layout: {
        padding: {
          top: 24,
          left: 16,
          right: 16,
          bottom: 16
        }
      },
      scales: {
        xAxes: [
          {
            display: false
          }
        ],
        yAxes: [
          {
            display: false,
            ticks: {
              // min: 100,
              // max: 500
            }
          }
        ]
      }
    }
  };
};
