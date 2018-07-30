import { MaterialUINavigation } from "main/content/components/material-ui/MaterialUINavigation";
import { authRoles } from "auth/auth";

export const fuseNavigationConfig = [
    {
    id: "leaderboard",
    title: "Leaderboard",
    type: "item",
    auth: authRoles.user,
    icon: "bubble_chart",
    url: "/mirrorr/leaderboard"
  },
    {
    id: "insight",
    title: "Insight",
    type: "item",
    icon: "bubble_chart",
    url: "/mirrorr/insight"
  },
    {
        id   : 'media_posts',
        title: 'Media',
        type : 'item',
        icon : 'perm_media',
        url  : '/mirrorr/media'
    },
    {
    id: "admin",
    auth: authRoles.admin,
    title: "Administrator Area",
    type: "group",
    icon: "settings_applications",
    children: [
      {
        id: "typeahead",
        title: "Typeahead",
        type: "item",
        icon: "account_box",
        url: "/admin/typeahead/all"
      },
      {
        id: "social_profiles",
        title: "Social Profiles",
        type: "item",
        icon: "star_rate",
        url: "/admin/mirrorr/profiles"
      }
    ]
  }
];
