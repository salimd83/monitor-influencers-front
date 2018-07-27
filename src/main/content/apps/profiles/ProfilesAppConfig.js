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
      path: '/admin/mirrorr/profiles/:term?',
      component: ProfilesApp
    }
  ]
};
