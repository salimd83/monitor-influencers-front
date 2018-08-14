import {MaterialUINavigation} from 'main/content/components/material-ui/MaterialUINavigation'
import {authRoles}            from 'auth/auth'

export const fuseNavigationConfig = [
    {
        id   : 'siLeaderboard',
        title: 'Leader Board',
        type : 'item',
        auth : 'siLeaderboard',
        apps : ['mirrorr'],
        icon : 'score',
        url  : '/mirrorr/leaderboard'
    },
    {
        id   : 'siInsights',
        title: 'Insight',
        auth : 'siInsights',
        apps : ['mirrorr'],
        type : 'item',
        icon : 'bubble_chart',
        url  : '/mirrorr/insight'
    },
    {
        id   : 'siBarometer',
        title: 'Mirrorr Data',
        auth : 'siBarometer',
        apps : ['mirrorr'],
        type : 'item',
        icon : 'show_chart',
        url  : '/mirrorr/data'
    },
    {
        id   : 'siMedia',
        title: 'Media',
        auth : 'siMedia',
        apps : ['mirrorr'],
        type : 'item',
        icon : 'perm_media',
        url  : '/mirrorr/media'
    },
    {
        id  : 'divider1',
        type: 'divider'
    },
    {
        id      : 'mirroradmin',
        auth    : 'admin',
        title   : 'Mirror  Admin',
        type    : 'group',
        apps    : [
            'simple',
            'admin',
            'mirrorr'
        ],
        icon    : 'settings_appslications',
        children: [
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
            },
            {
                id   : 'simpleadmin',
                title: 'Admin Area',
                auth : 'admin',
                type : 'item',
                apps : ['mirrorr'],
                icon : 'settings',
                url  : '/admin/typeahead/all'
            }
        ]
    },
    {
        id   : 'typeahead',
        title: 'Type ahead',
        auth : 'typeahead',
        type : 'item',
        apps : ['admin'],
        icon : 'list',
        url  : '/admin/typeahead/all'
    },
    {
        id      : 'apps',
        auth    : 'appsmenu',
        title   : 'apps',
        type    : 'group',
        apps    : [],
        icon    : 'settings_appslications',
        children: [
            {
                id   : 'mirrorr',
                title: 'Mirrorr',
                auth : 'siLeaderboard',
                apps : [],
                type : 'item',
                icon : 'pages',
                image: '/static/images/apps/mirrorr.jpg',
                url  : '/mirrorr'
            },
            {
                id   : 'mesur',
                title: 'Mesur',
                auth : 'mesur',
                apps : [],
                type : 'item',
                icon : 'pages',
                image: '/static/images/apps/mesur.jpg',
                url  : '/mirrorr'
            },
            {
                id   : 'admin',
                title: 'Admin',
                auth : 'admin',
                apps : [],
                type : 'item',
                icon : 'settings_applications',
                image: '/static/images/apps/admin.jpg',
                url  : '/admin/typeahead/all'
            }
        ]
    }
];
