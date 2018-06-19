import TypeaheadsApp from './TypeaheadsApp';
import React from 'react';
import { Redirect } from 'react-router-dom';

export const TypeaheadsAppConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/apps/typeahead/:id',
      component: TypeaheadsApp
    },
    {
      path: '/apps/typeahead',
      component: () => <Redirect to="/apps/typeahead/all" />
    }
  ]
};
