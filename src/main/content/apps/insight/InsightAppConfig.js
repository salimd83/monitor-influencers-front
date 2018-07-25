import InsightApp from 'main/content/apps/insight/InsightApp'

export const InsightAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/apps/insight/:id?/:from?/:to?',
            component: InsightApp
        }
    ]
}
