import Locked      from './Locked'
import {authRoles} from 'auth/auth'

export const LockedConfig = {
    settings: {
        layout: {
            config: {
                navbar : {
                    display: false
                },
                toolbar: {
                    display: false
                },
                footer : {
                    display: false
                }
            }
        }
    },
    auth    : ['guest'],
    routes  : [
        {
            path     : '/locked',
            component: Locked
        }
    ]
}

