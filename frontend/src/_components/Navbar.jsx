import { AccountCircle, Payment, SportsEsports } from '@mui/icons-material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../_store';

import { Stack } from '@mui/material';
export { Navbar };
let pages = [];

function Navbar() {
    const dispatch = useDispatch();
    const authUser = useSelector((x) => x.auth.user);
    const logout = () => dispatch(authActions.logout());

    const navigate = useNavigate();
    const handleNavigation = (location) => {
        navigate(location);
    };
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    //if (!authUser) return null;

    return (
        <AppBar position="static" sx={{ bgcolor: '#071952', mb: 3 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link to="/">
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LIVE CHAT
                        </Typography>
                    </Link>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    component={Link}
                                    to={page.link}
                                    key={page.id}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center">
                                        {page.title}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Link to="/">
                        <Typography
                            variant="h5"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LIVE CHAT
                        </Typography>
                    </Link>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                component={Link}
                                to={page.link}
                                key={page.id}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    gap={1}
                                >
                                    {page.icon}
                                    <Typography>{page.title}</Typography>
                                </Stack>
                            </Button>
                        ))}
                    </Box>
                    {authUser != null && authUser.roleId == 1 ? (
                        <Box sx={{ flexGrow: 0, mx: 1 }}>
                            <Tooltip title="Admin settings">
                                <IconButton sx={{ p: 0 }}>
                                    <AdminPanelSettingsIcon
                                        style={{ color: 'white' }}
                                    />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    ) : null}
                    <Box sx={{ flexGrow: 0, ml: 1 }}>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <AccountCircle sx={{ color: 'white' }} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {authUser != null
                                ? [
                                      <MenuItem
                                          key="username"
                                          onClick={handleCloseUserMenu}
                                      >
                                          <Typography textAlign="center">
                                              {authUser.username}
                                          </Typography>
                                      </MenuItem>,
                                      <MenuItem
                                          key="logout"
                                          onClick={handleCloseUserMenu}
                                      >
                                          <Typography
                                              textAlign="center"
                                              onClick={logout}
                                          >
                                              Log out
                                          </Typography>
                                      </MenuItem>,
                                  ]
                                : [
                                      <MenuItem
                                          component={Link}
                                          to="/login"
                                          key="login"
                                          onClick={handleCloseUserMenu}
                                      >
                                          <Typography textAlign="center">
                                              Sign in
                                          </Typography>
                                      </MenuItem>,
                                      <MenuItem
                                          component={Link}
                                          to="/register"
                                          key="register"
                                          onClick={handleCloseUserMenu}
                                      >
                                          <Typography textAlign="center">
                                              Sign up
                                          </Typography>
                                      </MenuItem>,
                                  ]}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
