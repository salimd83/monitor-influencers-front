export default dataObjs => {
  let data = [],
    labels = [];
  // const sortedArray = dataObjs.sort((a, b) => b.count - a.count);
  dataObjs.forEach(dataObj => {
    labels.push(dataObj.label);
    data.push(dataObj.percentage);
  });
  return {
    labels,
    datasets: {
      Today: [
        {
          data,
          change: [-0.6, 0.7, 0.1]
        }
      ],
      Yesterday: [
        {
          data,
          change: [-2.3, 0.3, -0.2]
        }
      ],
      'Last 7 days': [
        {
          data,
          change: [1.9, -0.4, 0.3]
        }
      ],
      'Last 28 days': [
        {
          data,
          change: [-12.6, -0.7, 4.2]
        }
      ],
      'Last 90 days': [
        {
          data,
          change: [2.6, -0.7, 2.1]
        }
      ]
    },
    options: {
      cutoutPercentage: 75,
      spanGaps: false,
      legend: {
        display: false
      },
      maintainAspectRatio: false
    }
  };
};
