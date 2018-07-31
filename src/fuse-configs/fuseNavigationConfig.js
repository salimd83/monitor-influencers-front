import {MaterialUINavigation} from 'main/content/components/material-ui/MaterialUINavigation'
import {authRoles}            from 'auth/auth'

export const fuseNavigationConfig = [
    {
        id   : 'leaderboard',
        title: 'Leaderboard',
        type : 'item',
        auth : 'siLeaderboard',
        icon : 'bubble_chart',
        url  : '/mirrorr/leaderboard'
    },
    {
        id   : 'insight',
        title: 'Insight',
        auth : 'siInsights',
        type : 'item',
        icon : 'bubble_chart',
        url  : '/mirrorr/insight'
    },
    {
        id   : 'media_posts',
        title: 'Media',
        auth : 'siMedia',
        type : 'item',
        icon : 'perm_media',
        url  : '/mirrorr/media'
    },
    {
        id      : 'admin',
        auth    : 'admin',
        title   : 'Administrator Area',
        type    : 'group',
        icon    : 'settings_applications',
        children: [
            {
                id   : 'typeahead',
                title: 'Typeahead',
                auth : 'typeahead',
                type : 'item',
                icon : 'account_box',
                url  : '/admin/typeahead/all'
            },
            {
                id   : 'social_profiles',
                title: 'Social Profiles',
                auth : 'siSocialProfiles',
                type : 'item',
                icon : 'star_rate',
                url  : '/admin/mirrorr/profiles'
            }
        ]
    }
]
