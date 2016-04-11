import { LOGIN, LOGOUT } from './../constants/ActionTypes';

export function authenticationMiddleware() {
    return next => action => {
        next(action);

        if (action.type === LOGIN || action.type === LOGOUT) {
            localStorage.setItem('authentication', JSON.stringify(action.payload.authentication));
        }
    };
}
