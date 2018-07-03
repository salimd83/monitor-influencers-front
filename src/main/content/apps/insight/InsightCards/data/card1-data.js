export default () => {
    return {
        conversion: {
            value   : 492,
            ofTarget: 13
        },
        chartType : 'bar',
        datasets  : [
            {
                label: 'Conversion',
                data : [
                    221,
                    428,
                    492,
                    471,
                    413,
                    344,
                    294
                ]
            }
        ],
        labels    : [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ],
        options   : {
            spanGaps           : false,
            legend             : {
                display: false
            },
            maintainAspectRatio: false,
            layout             : {
                padding: {
                    top   : 24,
                    left  : 16,
                    right : 16,
                    bottom: 16
                }
            },
            scales             : {
                xAxes: [
                    {
                        display: false
                    }
                ],
                yAxes: [
                    {
                        display: false,
                        ticks  : {
                            min: 100,
                            max: 500
                        }
                    }
                ]
            }
        }
    }
}