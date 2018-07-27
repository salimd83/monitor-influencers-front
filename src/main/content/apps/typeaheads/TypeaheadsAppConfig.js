import TypeaheadsApp from "./TypeaheadsApp";
import React from "react";
import { Redirect } from "react-router-dom";

export const TypeaheadsAppConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: "/admin/typeahead/:type/:term?",
      component: TypeaheadsApp
    },
    {
      path: "/admin/typeahead",
      component: () => <Redirect to="/apps/typeahead/all" />
    }
  ]
};
