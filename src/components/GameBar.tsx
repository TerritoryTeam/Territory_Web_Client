import { useState } from "react";
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
    useAppDispatch,
    useAppSelector,
} from "../hook";
import LoginDialog from "./LoginPanel";
import { logout } from "../stores/slices/AuthSlice";

function GameBar() {
    const dispatch = useAppDispatch();
    const isLoginIn = useAppSelector((state) => state.auth.loginStatus === 'success');
    const user = useAppSelector((state) => state.user);

    const [isLoginDialogOn, setIsLoginDialogOn] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const {classes} = useStyles()

    const userSignOut = () => {
        dispatch(logout());
    }

    const handleLoginDialog = (open : boolean = false) => {
        setIsLoginDialogOn(open);
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
                                onClick={() => handleLoginDialog(true)}>
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