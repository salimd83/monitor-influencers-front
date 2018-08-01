import MediaApp           from 'main/content/apps/media/MediaApp'
import FuseSettingsConfig from 'fuse-configs/fuseSettingsConfig'


export const MediaAppConfig = {
    settings: {
        layout: {
            config: {}
        }, ...FuseSettingsConfig.alternativeConfig.mirror
    },
    auth    : ['siMedia'],
    routes  : [
        {
            path     : '/mirrorr/media/post/:postid',
            component: MediaApp
        },
        {
            path     : '/mirrorr/media/:id?/:from?/:to?/:tags?/:types?',
            component: MediaApp
        }
    ]
}
