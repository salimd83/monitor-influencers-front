import ProfilesApp from 'main/content/apps/profiles/ProfilesApp';
import React from 'react';
import { Redirect } from 'react-router-dom';

export const ProfilesAppConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/apps/profiles/:term',
      component: ProfilesApp
    },
    {
      path: '/apps/profiles',
      component: () => <Redirect to="/apps/profiles/all" />
    }
  ]
};
