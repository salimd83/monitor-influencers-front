import InsightApp         from 'main/content/apps/insight/InsightApp'
import FuseSettingsConfig from 'fuse-configs/fuseSettingsConfig'

export const InsightAppConfig = {
    settings: {
        layout: {
            config: {}
        }, ...FuseSettingsConfig.alternativeConfig.mirror
    },
    auth    : ['siInsights'],
    routes  : [
        {
            path     : '/mirrorr/insight/:id?/:from?/:to?',
            component: InsightApp
        }
    ]
}
