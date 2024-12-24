import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "tss-react/mui"

import { 
    AppBar,
    Button,
    Box,
    IconButton,
    Toolbar,
    Typography,
    Stack,
    Tooltip,
    Menu,
    Avatar,
    MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { 
    AppDispatch, 
    RootState,
} from "../store";
import LoginDialog from "./LoginPanel";
import { logout } from "../store/slices/AuthSlice";

function GameBar() {
    const dispatch = useDispatch<AppDispatch>();
    const isLoginIn = useSelector((state: RootState) => state.auth.loginStatus === 'success');
    const user = useSelector((state: RootState) => state.user);

    const [isLoginDialogOn, setIsLoginDialogOn] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const {classes} = useStyles()

    const userSignOut = () => {
        dispatch(logout());
    }

    const handleLoginDialog = () => {
        setIsLoginDialogOn(!isLoginDialogOn);
    }

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }} >
                    <MenuIcon />
                </IconButton>
                <img
                    className= { classes.barLogo }
                    src="/assets/logo.png" alt="logo" />
                <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    
                </Stack>
                <Box>
                    {
                        isLoginIn ? (
                            <>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt={user?.username} src={user?.avatarUrl} />
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
                                    <MenuItem key="signout" onClick={userSignOut}>
                                        <Typography sx={{ textAlign: 'center' }}>Sign Out</Typography>
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Button 
                                color="inherit"
                                onClick={handleLoginDialog}>
                                    Sign In or Register
                            </Button>
                        )
                    }
                </Box>
            </Toolbar>
            <LoginDialog 
                open={isLoginDialogOn}
                onClose={handleLoginDialog} />
      </AppBar>
    )
}

const useStyles = makeStyles() ({
    barLogo: {
        width: "116px",
    }
})

export default GameBar;