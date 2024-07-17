import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notification',
    initialState: [],
    reducers: {
        addNotification: (state, action) => {
            state.push({
                id: Date.now(),
                message: action.payload.message,
                notificationType: action.payload.notificationType,
            });
        },
        removeNotification: (state, action) => {
            return state.filter(
                (notification) => notification.id !== action.payload
            );
        },
        clearNotifications: () => [],
    },
});

export const { addNotification, removeNotification, clearNotifications } =
    notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
