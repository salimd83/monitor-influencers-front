import Locked      from './Locked'
import {authRoles} from 'auth/auth'

export const LockedConfig = {
    settings: {
        layout: {
            config: {
                navbar : {
                    display: true
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
    auth    : authRoles.onlyGuest,
    routes  : [
        {
            path     : '/locked',
            component: Locked
        }
    ]
}

