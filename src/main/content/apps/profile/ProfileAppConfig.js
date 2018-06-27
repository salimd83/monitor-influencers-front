import ProfileApp from 'main/content/apps/profile/ProfileApp';

export const ProfileAppConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/apps/profile/:id',
      component: ProfileApp
    }
  ]
};
