import ContactsApp from './ContactsApp';
import React from 'react';
import {Redirect} from 'react-router-dom';

export const TypeaAheadAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/apps/typeahead/:id',
            component: ContactsApp
        },
        {
            path     : '/apps/typeahead',
            component: () => <Redirect to="/apps/typeahead/all"/>
        }
    ]
};
