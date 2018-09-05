export const fuseNavigationConfig = [
    {
        id   : 'siLeaderboard',
        title: 'Leader Board',
        type : 'item',
        auth : 'siLeaderboard',
        apps : ['mirrorr'],
        icon : 'score',
        url  : '/leaderboard'
    },
    {
        id   : 'siInsights',
        title: 'Insight',
        auth : 'siInsights',
        apps : ['mirrorr'],
        type : 'item',
        icon : 'bubble_chart',
        url  : '/insight'
    },
    {
        id   : 'siBarometer',
        title: 'Mirrorr Data',
        auth : 'siBarometer',
        apps : ['mirrorr'],
        type : 'item',
        icon : 'show_chart',
        url  : '/data'
    },
    {
        id   : 'siMedia',
        title: 'Media',
        auth : 'siMedia',
        apps : ['mirrorr'],
        type : 'item',
        icon : 'perm_media',
        url  : '/media'
    },
    {
        id   : 'siReport',
        title: 'report',
        // auth : 'siMedia',
        apps : ['mirrorr'],
        type : 'item',
        icon : 'perm_media',
        url  : '/reports'
    },
    {
        id  : 'divider1',
        type: 'divider'
    },
    {
        id      : 'mirroradmin',
        auth    : 'admin',
        title   : ' Admin',
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
                url  : '/admin/profiles'
            },
            {
                id   : 'typeahead',
                title: 'Typeahead',
                auth : 'typeahead',
                type : 'item',
                apps : [
                    'mirrorr',
                    'admin'
                ],
                icon : 'settings',
                url  : '/admin/typeahead/all'
            }
        ]
    }
];
