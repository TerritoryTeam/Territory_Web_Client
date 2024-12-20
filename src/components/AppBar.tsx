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

function GameBar() {
    const {classes} = useStyles()

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
                    <Button color="inherit">Login</Button>
                </Box>
            </Toolbar>
      </AppBar>
    )
}

const useStyles = makeStyles() ({
    barLogo: {
        width: "116px",
    }
})

export default GameBar;