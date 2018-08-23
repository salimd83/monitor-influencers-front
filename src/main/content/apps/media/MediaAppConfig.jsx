import MediaApp           from 'main/content/apps/media/MediaApp'
import FuseSettingsConfig from 'fuse-configs/fuseSettingsConfig'

export const MediaAppConfig = {
    settings: {
        layout: {
            config: {}
    },
        ...FuseSettingsConfig.alternativeConfig.mirror
    },
    auth    : ['siMedia'],
    routes  : [
        {
            path     : '/media/post/:postid',
            component: MediaApp
        },
        {
            path     : '/media/:id?/:from?/:to?/:tags?/:types?/:postid?',
            component: MediaApp
        },
        {
            path     : '/media/:id?/:from?/:to?/:tags?/:types?',
            component: MediaApp
        }
    ]
};
