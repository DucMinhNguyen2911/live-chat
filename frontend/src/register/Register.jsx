import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { fetchWrapper, history } from '../_helpers';
import { addNotification, clearNotifications } from '../_store';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { CircularProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { blue } from '@mui/material/colors';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
export { Register };

function Register() {
    document.title = 'Sign Up';
    const authUser = useSelector((x) => x.auth.user);
    const dispatch = useDispatch();
    const showNotification = (message, notificationType) => {
        dispatch(addNotification({ message, notificationType }));
    };
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required')
            .min(5, 'Must be more than 5 characters')
            .max(10, 'Must be less than 10 characters')
            .matches(
                /^[a-z0-9]+$/,
                'Only lowercase letters and numbers are allowed, with no spaces.'
            ),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Must be more than 6 characters')
            .max(50, 'Must be less than 50 characters'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    const baseUrl = `${process.env.REACT_APP_AUTH_URL}/auth`;
    const onSubmit = async ({ username, password }) => {
        dispatch(clearNotifications());
        await fetchWrapper
            .post(`${baseUrl}/register`, {
                username,
                password,
            })
            .then((response) => {
                history.navigate('/login');
            })
            .catch((errors) => {
                if (errors instanceof TypeError) {
                    showNotification(errors.message, 'error');
                } else {
                    errors.forEach((error) => {
                        showNotification(error, 'error');
                    });
                }
            });
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: '#BC6FF1' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" color={'#FFFFFF'}>
                    Đăng ký
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                {...register('username')}
                                error={errors.username != null}
                                helperText={
                                    errors.username
                                        ? errors.username?.message
                                        : ''
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                {...register('password')}
                                error={errors.password != null}
                                helperText={
                                    errors.password
                                        ? errors.password?.message
                                        : ''
                                }
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            bgcolor: '#000000',
                            color: '#FFFFFF',
                            ':hover': { bgcolor: '#1a1a1a' },
                        }}
                        disabled={isSubmitting}
                    >
                        Đăng ký
                        {isSubmitting && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    color: blue[500],
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                }}
                            />
                        )}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <RouterLink to="/login" variant="body2">
                                Already have an account? Sign in
                            </RouterLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
