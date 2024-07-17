import { Container, ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import {
    Navigate,
    Route,
    Routes,
    useLocation,
    useNavigate,
} from 'react-router-dom';
import {
    AuthenticatedRoute,
    Navbar,
    Notification,
    UnauthenticatedRoute,
} from './_components';
import { history } from './_helpers';
import { Home } from './home';
import { Login } from './login';
import { Register } from './register';

export { App };
const defaultTheme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#088395',
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#FFFFFF',
                    '&.Mui-disabled': {
                        color: '#b8b8b8',
                    },
                    '&.Mui-focused': {
                        color: '#EBF4F6',
                    },
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    color: '#EBF4F6',
                    '&.Mui-disabled': {
                        color: '#b8b8b8',
                    },
                },
            },
        },
    },
});

function App() {
    history.navigate = useNavigate();
    history.location = useLocation();
    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline />
                <Navbar />
                <Notification />
                <Container
                    component="main"
                    maxWidth="lg"
                    sx={{ bgcolor: '#088395', minHeight: '100vh' }}
                >
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <AuthenticatedRoute>
                                    <Home />
                                </AuthenticatedRoute>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <UnauthenticatedRoute>
                                    <Login />
                                </UnauthenticatedRoute>
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <UnauthenticatedRoute>
                                    <Register />
                                </UnauthenticatedRoute>
                            }
                        />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </Container>
            </ThemeProvider>
        </>
    );
}
