import { Alert, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { removeNotification, addNotification } from '../_store';
import signalRService from '../signalR/signalRService';
import { useEffect } from 'react';
export { Notification };

function Notification() {
    const dispatch = useDispatch();
    // const { user: authUser } = useSelector((x) => x.auth);
    const notifications = useSelector((x) => x.notification);
    const handleClearNotification = (id) => {
        dispatch(removeNotification(id));
    };
    const showNotification = (message, notificationType) => {
        dispatch(addNotification({ message, notificationType }));
    };

    // useEffect(() => {
    //     if (authUser && authUser.token) {
    //         signalRService.startConnection(authUser.token);
    //         signalRService.onReceiveMessage((message) => {
    //             console.log('Received message: ', message);
    //             showNotification(message, 'info');
    //         });
    //         // Handle cleanup on unmount
    //         return () => {
    //             signalRService.stopConnection();
    //         };
    //     }
    // }, [authUser]);

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: '1000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
            }}
        >
            {notifications.map((notification) => (
                <Alert
                    key={notification.id}
                    severity={notification.notificationType}
                    onClose={() => handleClearNotification(notification.id)}
                    sx={{ mt: 1 }}
                >
                    {notification.message}
                </Alert>
            ))}
        </Box>
    );
}
