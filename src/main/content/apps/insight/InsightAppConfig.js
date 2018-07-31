import InsightApp from 'main/content/apps/insight/InsightApp'

export const InsightAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth    : ['siInsights'],
    routes  : [
        {
            path     : '/mirrorr/insight/:id?/:from?/:to?',
            component: InsightApp
        }
    ]
}
