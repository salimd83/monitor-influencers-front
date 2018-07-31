import {authRoles} from 'auth/auth';
import store from 'store';
import {logoutUser} from 'auth/store/actions';

export const LogoutConfig = {
    auth  : 'login',
    routes: [
        {
            path     : '/logout',
            component: () => {
                store.dispatch(logoutUser());
                return 'Logging out..'
            }
        }
    ]
};

