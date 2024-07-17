//import { userActions } from '_store';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { removeNotification, addNotification } from '../_store';
import signalRService from '../signalR/signalRService';
import { useEffect, useRef, useState } from 'react';
import { fetchWrapper } from '../_helpers';
import ChatBubble from './ChatBubble';
import { Send } from '@mui/icons-material';
export { Home };

function Home() {
    document.title = 'Live Chat';
    const baseUrl = `${process.env.REACT_APP_CHAT_URL}/chat`;
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { user: authUser } = useSelector((x) => x.auth);

    const handleClearNotification = (id) => {
        dispatch(removeNotification(id));
    };
    const showNotification = (message, notificationType) => {
        dispatch(addNotification({ message, notificationType }));
    };

    const chatContainerRef = useRef();
    const chatContainerScrolledUp = useRef(false);
    const shouldIgnoreScroll = useRef(false);

    const handleChatContainerScroll = () => {
        if (shouldIgnoreScroll.current) {
            shouldIgnoreScroll.current = false;
            return;
        }
        const chatContainer = chatContainerRef.current;
        chatContainerScrolledUp.current = chatContainer.scrollTop + chatContainer.clientHeight < chatContainer.scrollHeight;
    };

    const userNotiScrollToBottom = () => {
        shouldIgnoreScroll.current = true;
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    };

    useEffect(() => {
        if (!chatContainerScrolledUp.current) {
            userNotiScrollToBottom();
        }
    }, [messages]);

    useEffect(() => {
        fetchWrapper.get(`${baseUrl}`).then((response) => {
            setMessages(response.reverse());
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (authUser && authUser.token) {
            signalRService.startConnection(authUser.token);
            signalRService.onReceiveMessage((username, receivedMessage) => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { username, message: receivedMessage },
                ]);
                console.log(
                    'Username: ' + username + '; Message: ' + receivedMessage
                );
            });
            // Handle cleanup on unmount
            return () => {
                signalRService.stopConnection();
            };
        }
    }, [authUser]);

    const handleSendMessage = () => {
        signalRService.sendMessage(message);
        setMessage('');
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 3 }}>
            <Container>
                <Box
                    component={"div"}
                    sx={{
                        bgcolor: '#071952',
                        borderRadius: '20px',
                        maxHeight: '70vh',
                        minHeight: '70vh',
                        overflow: 'auto',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                    ref={chatContainerRef} 
                    onScroll={handleChatContainerScroll}
                >
                    {messages.map((msg, index) => (
                        <ChatBubble
                            key={index}
                            username={msg.username}
                            message={msg.message}
                        />
                    ))}
                </Box>
            </Container>
            <Container sx={{ mt: 1 }}>
                <Box
                    sx={{
                        bgcolor: '#071952',
                        borderRadius: '20px',
                        maxHeight: '10vh',
                        minHeight: '10vh',
                        padding: '20px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <TextField
                        id="message-input"
                        label="Type a message"
                        variant="standard"
                        fullWidth
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        sx={{ mr: 2 }}
                    />
                    <Button
                        variant="contained"
                        endIcon={<Send />}
                        sx={{
                            background: '#37B7C3',
                            color: '#EBF4F6',
                            ':hover': { bgcolor: '#088395' },
                        }}
                        onClick={handleSendMessage}
                    >
                        Send
                    </Button>
                </Box>
            </Container>
        </Container>
    );
}
