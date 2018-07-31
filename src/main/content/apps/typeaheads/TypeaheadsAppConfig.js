import TypeaheadsApp from './TypeaheadsApp'
import React         from 'react'
import {Redirect}    from 'react-router-dom'

export const TypeaheadsAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth    : ['typeahead'],
    routes  : [
        {
            path     : '/admin/typeahead/:type/:term?/:id?',
            component: TypeaheadsApp
        },
        {
            path     : '/admin/typeahead',
            component: () => <Redirect to="/apps/typeahead/all"/>
        }
    ]
}
