import IndexComp from './Index'

export const IndexConfig = {
    settings: {
        layout: {
            config: {
                navbar : {
                    display: false
                },
                toolbar: {
                    display: false
                },
                footer : {
                    display: false
                }
            }
        }
    },
    auth    : ['login'],
    routes  : [
        {
            path     : '/index',
            component: IndexComp
        }
    ]
}

