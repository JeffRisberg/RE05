import fetch from 'isomorphic-fetch';

import { LOGIN, LOGOUT } from '../constants/ActionTypes';
import { RECEIVE_TASKS, ADD_TASK, COMPLETE_TASK } from '../constants/ActionTypes';

export function getAuth() {
    let authentication = JSON.parse(localStorage.getItem('authentication')) || {apiToken: '', uuId: ''};

    return {
        type: LOGIN,
        payload: {
            authentication
        }
    };
}

export function login(uuId, apiToken) {
    return {
        type: LOGIN,
        payload: {
            authentication: {
                uuId,
                apiToken
            }
        }
    };
}

export function logout() {
    return {
        type: LOGOUT,
        payload: {
            tasks: [],
            authentication: {
                uuId: '',
                apiToken: ''
            }
        }
    };
}

export function fetchTasks() {
    return function (dispatch, getState) {
        let state = getState();

        if (!state.authentication || state.authentication.uuId.length === 0 || state.authentication.apiToken.length === 0) {
            return function () {
            };
        }

        return fetch('/api/tasks', {
            //headers: {
            //    'X-API-User': state.authentication.uuId,
            //    'X-API-Key': state.authentication.apiToken
            //}
        })
            .then(response => response.json())
            .then((json) => {
                console.log(json);
                dispatch(receiveTasks(json.tasks));
            })
            ;
    };
}

export function receiveTasks(tasks) {
    console.log("receiveTasks " + tasks);
    return {
        type: RECEIVE_TASKS,
        payload: {
            tasks
        }
    };
}

export function addTask(text, type) {
    return {
        type: ADD_TASK,
        payload: {
            text,
            type
        }
    };
}

export function completeTask(id) {
    return {
        type: COMPLETE_TASK,
        payload: {
            id
        }
    };
}
