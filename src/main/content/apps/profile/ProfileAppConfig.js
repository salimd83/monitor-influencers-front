import ProfileApp from 'main/content/apps/profile/ProfileApp';

export const ProfileAppConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/admin/mirrorr/profile/:id',
      component: ProfileApp
    }
  ]
};
