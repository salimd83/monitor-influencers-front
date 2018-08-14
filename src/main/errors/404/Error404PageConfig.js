import Error404Page from 'main/errors/404/Error404Page'

export const Error404PageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth    : ['login'],
    routes  : [
        {
            path     : '*',
            component: Error404Page
        }
    ]
};
