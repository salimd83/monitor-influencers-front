import { MaterialUINavigation } from 'main/content/components/material-ui/MaterialUINavigation';
import { authRoles } from 'auth/auth';

export const fuseNavigationConfig = [
    {
        id   : 'leaderboard',
        title: 'Leaderboard',
        type : 'item',
        auth : authRoles.user,
        icon : 'bubble_chart',
        url  : '/si/leaderboard'
    },
    {
        id: 'insight',
        title: 'Insight',
        type: 'item',
        icon: 'bubble_chart',
        url: '/apps/insight'
    },
    {
        id      : 'admin',
        auth    : authRoles.admin,
        title   : 'Administrator Area',
        type    : 'group',
        icon    : 'settings_applications',
        children: [
            {
                id   : 'typeahead',
                title: 'Typeahead',
                type : 'item',
                icon : 'account_box',
                url  : '/apps/typeahead/all'
            },
            {
                id   : 'social_profiles',
                title: 'Social Profiles',
                type : 'item',
                icon : 'star_rate',
                url  : '/apps/profiles/all'
            }
        ]
    }
]
