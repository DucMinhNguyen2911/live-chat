import * as signalR from '@microsoft/signalr';

class SignalRService {
    constructor() {
        this.connection = null;
    }

    startConnection = (userToken) => {
        if (!userToken) {
            console.error('User token is required to start SignalR connection');
            return;
        }

        this.connection =
            new signalR.HubConnectionBuilder()
                .withUrl(
                    `${process.env.REACT_APP_CHAT_URL}/chatHub`,
                    {
                        accessTokenFactory: () => userToken,
                    }
                )
                .withAutomaticReconnect()
                .configureLogging(signalR.LogLevel.Information)
                .build();

        this.connection
            .start()
            .then(() => {
                console.log('SignalR Connected.');
            })
            .catch((err) => {
                console.error('SignalR Connection Error: ', err);
            });
    };

    stopConnection = () => {
        if (this.connection) {
            this.connection.stop();
        }
    };

    onReceiveMessage = (callback) => {
        if (this.connection) {
            this.connection.on('ReceiveMessage', callback);
        }
    };

    sendMessage = (message) => {
        if (this.connection) {
            this.connection.invoke('SendMessageToAll', message)
                .catch((err) => console.error('Error sending message: ', err));
        }
    };
}

const signalRService = new SignalRService();
export default signalRService;
