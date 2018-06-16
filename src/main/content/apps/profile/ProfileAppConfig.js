import ProfileApp from 'main/content/apps/profile/ProfileApp';
import React from 'react';
import { Redirect } from 'react-router-dom';

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
