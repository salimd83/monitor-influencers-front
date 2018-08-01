import {MaterialUINavigation} from 'main/content/components/material-ui/MaterialUINavigation'
import {authRoles}            from 'auth/auth'

export const fuseNavigationConfig = [
    {
        id   : 'leaderboard',
        title: 'Leaderboard',
        type : 'item',
        auth : 'siLeaderboard',
        apps : ['mirrorr'],
        icon : 'bubble_chart',
        url  : '/mirrorr/leaderboard'
    },
    {
        id   : 'insight',
        title: 'Insight',
        auth : 'siInsights',
        apps : ['mirrorr'],
        type : 'item',
        icon : 'bubble_chart',
        url  : '/mirrorr/insight'
    },
    {
        id   : 'media_posts',
        title: 'Media',
        auth : 'siMedia',
        apps : ['mirrorr'],
        type : 'item',
        icon : 'perm_media',
        url  : '/mirrorr/media'
    },
    {
        type: 'divider'
    },
    {
        id      : 'admin',
        auth    : 'admin',
        title   : 'Administrator Area',
        type    : 'group',
        apps    : [
            'simple',
            'admin',
            'mirrorr'
        ],
        icon    : 'settings_appslications',
        children: [
            {
                id   : 'typeahead',
                title: 'Typeahead',
                auth : 'typeahead',
                type : 'item',
                apps : [
                    'simple',
                    'admin',
                    'mirrorr'
                ],
                icon : 'account_box',
                url  : '/admin/typeahead/all'
            },
            {
                id   : 'social_profiles',
                title: 'Social Profiles',
                auth : 'siSocialProfiles',
                apps : [
                    'mirrorr',
                    'admin'
                ],
                type : 'item',
                icon : 'star_rate',
                url  : '/mirrorr/admin/profiles'
            }
        ]
    }
]
