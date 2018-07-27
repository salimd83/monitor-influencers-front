import ProfileApp from 'main/content/apps/profile/ProfileApp';

export const ProfileAppConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/mirrorr/profile/:id',
      component: ProfileApp
    }
  ]
};
