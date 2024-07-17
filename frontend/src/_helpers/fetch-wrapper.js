import { authActions, store } from '../_store';
import { history } from './history';


export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE'),
    patch: request('PATCH'),
};

function request(method) {
    return (url, body) => {
        const requestOptions = {
            method,
            headers: authHeader(url),
        };
        if (body) {
            if (body instanceof FormData) {
                requestOptions.body = body;
            } else {
                requestOptions.headers['Content-Type'] = 'application/json';
                requestOptions.body = JSON.stringify(body);
            }
        }
        return fetch(url, requestOptions).then(handleResponse);
    };
}

// helper functions

function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const token = authToken();
    const isLoggedIn = !!token;
    if (isLoggedIn) {
        return { Authorization: `Bearer ${token}` };
    } else {
        return {};
    }
}

function authToken() {
    return store.getState().auth.user?.token;
}

function handleResponse(response) {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            if (response.status === 401 && authToken()) {
                store.dispatch(authActions.logout());
            } 
            // else if (response.status === 403 || response.status === 400) {
            //     history.navigate(-1); // Go back to the previous page
            // }

            const error = (data && data.messages) || [response.statusText];
            return Promise.reject(error);
        }
        return data;
    });
}
