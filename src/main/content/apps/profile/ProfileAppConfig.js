import ProfileApp         from 'main/content/apps/profile/ProfileApp'
import FuseSettingsConfig from 'fuse-configs/fuseSettingsConfig'


export const ProfileAppConfig = {
    settings: {
        layout: {
            config: {}
        }, ...FuseSettingsConfig.alternativeConfig.mirror

    },
    auth    : ['siSocialProfiles'],
    routes  : [
        {
            path     : '/mirrorr/admin/profile/:id',
            component: ProfileApp
        }
    ]
}
