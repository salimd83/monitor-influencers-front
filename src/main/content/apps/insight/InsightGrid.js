import React, {Component} from 'react'
import GridLayout         from 'react-grid-layout'
import {withStyles}       from '@material-ui/core/styles'
import Button             from '@material-ui/core/Button'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import {
    WidthProvider,
    Responsive
}                         from 'react-grid-layout'
import _                  from 'lodash'

import Widget1 from './widgets/Widget2'
import Widget2 from './widgets/Widget3'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

const widgets = [
    {
        component  : Widget1,
        popovertext: 'the content of widget1 popover',
        data       : {
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
    },
    {
        component  : Widget2,
        popovertext: 'the content of widget2 popover',
        data       : {
            impressions: {
                value   : '87k',
                ofTarget: 12
            },
            chartType  : 'line',
            datasets   : [
                {
                    label: 'Impression',
                    data : [
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
                    fill : false
                }
            ],
            labels     : [
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
            options    : {
                spanGaps           : false,
                legend             : {
                    display: false
                },
                maintainAspectRatio: false,
                elements           : {
                    point: {
                        radius          : 2,
                        borderWidth     : 1,
                        hoverRadius     : 2,
                        hoverBorderWidth: 1
                    },
                    line : {
                        tension: 0
                    }
                },
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
                                // min: 100,
                                // max: 500
                            }
                        }
                    ]
                }
            }
        }
    },
    {
        component  : Widget1,
        popovertext: 'the content of widget1 popover',
        data       : {
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
    },
    {
        component  : Widget1,
        popovertext: 'the content of widget1 popover',
        data       : {
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
    },
    {
        component  : Widget1,
        popovertext: 'the content of widget1 popover',
        data       : {
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
    },
    {
        component  : Widget1,
        popovertext: 'the content of widget1 popover',
        data       : {
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
    },
    {
        component  : Widget1,
        popovertext: 'the content of widget1 popover',
        data       : {
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
    },
    {
        component  : Widget1,
        popovertext: 'the content of widget1 popover',
        data       : {
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
    },
    {
        component  : Widget1,
        popovertext: 'the content of widget1 popover',
        data       : {
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
    },
    {
        component  : Widget1,
        popovertext: 'the content of widget1 popover',
        data       : {
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
]

class InsightGrid extends Component {
    static defaultProps  = {
        className: 'layout',
        cols     : {
            lg : 12,
            md : 9,
            sm : 6,
            xs : 3,
            xxs: 3
        },
        rowHeight: 100
    }
           state         = {
               items     : [
                   0,
                   1
               ].map((i, key, list) => {
                   return {
                       i  : i.toString(),
                       x  : i * 3,
                       y  : 0,
                       w  : 3,
                       h  : 2,
                       add: i === (list.length - 1).toString()
                   }
               }),
               newCounter: 2
           }
           createElement = el => {
               const removeStyle = {
                   position: 'absolute',
                   right   : '2px',
                   top     : 0,
                   cursor  : 'pointer'
               }
               console.log('widget name:', el.i)
               const i                            = el.add ? '+' : el.i
               const {component: Widget, ...rest} = widgets[Number(el.i)]

               return (<div key={i} data-grid={el}>
                   <Widget {...rest} />
                   <span
                       className="remove"
                       style={removeStyle}
                       onClick={this.onRemoveItem.bind(this, i)}
                   >
          x
        </span>
               </div>)
           }

    onAddItem = () => {
        /*eslint no-console: 0*/
        console.log('adding', 'n' + this.state.newCounter)
        const newItem = {
            i: String(this.state.newCounter),
            x: (this.state.items.length * 3) % (this.state.cols || 12),
            y: Infinity, // puts it at the bottom
            w: 3,
            h: 2
        }
        this.setState({
                          // Add a new item. It must have a unique key!
                          items     : [
                              ...this.state.items,
                              newItem
                          ], // Increment the counter to ensure key is always unique.
                          newCounter: this.state.newCounter + 1
                      })
    }

    onBreakpointChange = (breakpoint, cols) => {
        this.setState({
                          breakpoint: breakpoint,
                          cols      : cols
                      })
    }

    onLayoutChange = layout => {
        // this.props.onLayoutChange(layout);
        this.setState({layout: layout})
    }

    onRemoveItem = i => {
        console.log('removing', i)
        this.setState({items: _.reject(this.state.items, {i: i})})
    }

    render() {
        const {classes}           = this.props
        const {newCounter, items} = this.state
        let layout                = [
            {
                i   : 'a',
                x   : 0,
                y   : 0,
                w   : 4,
                h   : 6,
                minH: 6,
                maxH: 6
            },
            {
                i   : 'b',
                x   : 1,
                y   : 0,
                w   : 3,
                h   : 2,
                minW: 2,
                maxW: 4
            },
            {
                i: 'c',
                x: 4,
                y: 0,
                w: 1,
                h: 2
            }
        ]
        return (<div>
            <Button
                onClick={this.onAddItem}
                className={classes.button}
                variant="outlined"
                color="primary"
                disabled={Number(newCounter) < 8 ? false : true}
            >
                Add Item
            </Button>
            <ResponsiveReactGridLayout
                onLayoutChange={this.onLayoutChange}
                onBreakpointChange={this.onBreakpointChange}
                {...this.props}
            >
                {_.map(items, el => this.createElement(el))}
            </ResponsiveReactGridLayout>
        </div>)
    }
}

const styles = theme => ({
    bullet: {
        display  : 'inline-block',
        margin   : '0 2px',
        transform: 'scale(0.8)'
    },
    title : {
        marginBottom: 16,
        fontSize    : 14
    },
    pos   : {
        marginBottom: 12
    },
    button: {
        margin: theme.spacing.unit
    }
})

export default withStyles(styles, {withTheme: true})(InsightGrid)
