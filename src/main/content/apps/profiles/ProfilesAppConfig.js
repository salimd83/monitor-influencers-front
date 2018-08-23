import ProfilesApp        from 'main/content/apps/profiles/ProfilesApp'
import FuseSettingsConfig from 'fuse-configs/fuseSettingsConfig'


export const ProfilesAppConfig = {
    settings: {
        layout: {
            config: {}
        }, ...FuseSettingsConfig.alternativeConfig.mirror
    },
    auth    : ['siSocialProfiles'],
    routes  : [
        {
            path     : '/admin/profiles/:term?',
            component: ProfilesApp
        }
    ]
}
