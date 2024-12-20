import { makeStyles } from "tss-react/mui"

import { 
    AppBar,
    Button,
    Box,
    IconButton,
    Toolbar,
    Typography,
    Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import LoginDialog from "./LoginPanel";

function GameBar() {
    const [isLoginDialogOn, setIsLoginDialogOn] = useState(false);

    const {classes} = useStyles()

    const handleLoginClose = () => {
        setIsLoginDialogOn(!isLoginDialogOn);
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
                    <Typography variant="h6" component="div">
                        Resource 2
                    </Typography>
                </Stack>
                <Box>
                    <Button 
                        color="inherit"
                        onClick={handleLoginClose}>Login</Button>
                </Box>
            </Toolbar>
            <LoginDialog 
                open={isLoginDialogOn}
                onClose={handleLoginClose} />
      </AppBar>
    )
}

const useStyles = makeStyles() ({
    barLogo: {
        width: "116px",
    }
})

export default GameBar;