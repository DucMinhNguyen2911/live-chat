import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import { useSelector } from 'react-redux';

export default function ChatBubble(props) {
    const { message, username } = props;
    const { user: authUser } = useSelector((x) => x.auth);
    const isSent = username === authUser.username;
    return (
        <Box
            sx={{
                maxWidth: '100%',
                minWidth: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: isSent ? 'flex-end' : 'flex-start',
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                spacing={2}
                sx={{ mb: 0.25 }}
            >
                <Typography level="body-xs" sx={{ color: '#EBF4F6' }}>
                    {isSent ? '' : username}
                </Typography>
                <Typography level="body-xs" sx={{ color: '#EBF4F6' }}>
                    {isSent ? 'You' : ''}
                </Typography>
            </Stack>

            <Box sx={{ position: 'relative' }}>
                <Box
                    color={isSent ? 'primary' : 'neutral'}
                    variant={isSent ? 'solid' : 'soft'}
                    sx={{
                        p: 1.25,
                        borderRadius: '20px',
                        borderTopRightRadius: isSent ? 0 : '20px',
                        borderTopLeftRadius: isSent ? '20px' : 0,
                        backgroundColor: isSent ? '#088395' : '#EBF4F6',
                    }}
                >
                    <Typography
                        level="body-sm"
                        sx={{
                            color: isSent ? '#EBF4F6' : '#088395',
                        }}
                    >
                        {message}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
