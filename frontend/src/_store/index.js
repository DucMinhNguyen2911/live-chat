import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth.slice';
import { usersReducer } from './users.slice';
import { notificationReducer } from './notification.slice';

export * from './auth.slice';
export * from './users.slice';
export * from './notification.slice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        notification: notificationReducer,
    },
});
