import ReportApp from 'main/content/apps/report/ReportApp'
import FuseSettingsConfig from 'fuse-configs/fuseSettingsConfig'

export const ReportAppConfig = {
    settings: {
        layout: {
            config: {}
        },
        ...FuseSettingsConfig.alternativeConfig.mirror
    },
    // auth: ['siMedia'],
    routes: [
        {
            path: '/reports',
            component: ReportApp
        }
    ]
};
