import MediaApp from 'main/content/apps/media/MediaApp';

export const MediaAppConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/mirrorr/media/post/:postid',
      component: MediaApp
    },
    {
      path: '/mirrorr/media/:id?/:from?/:to?/:tags?/:types?',
      component: MediaApp
    }
  ]
};
