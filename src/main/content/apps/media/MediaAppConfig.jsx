import MediaApp from 'main/content/apps/media/MediaApp';

export const MediaAppConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/apps/media/:id?/:from?/:to?',
      component: MediaApp
    }
  ]
};
