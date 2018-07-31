import ProfileApp from 'main/content/apps/profile/ProfileApp'

export const ProfileAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth    : ['siSocialProfiles'],
    routes  : [
        {
            path     : '/admin/mirrorr/profile/:id',
            component: ProfileApp
        }
    ]
}
