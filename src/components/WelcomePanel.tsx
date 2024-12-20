import { useState } from "react";
import { useSelector } from "react-redux";

import { 
    Button,
    Backdrop,
    Stack,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";


import { RootState } from "../store";
import LoginDialog from "./LoginPanel";

export interface WelcomeDialogProps {
    open: boolean;
    onClose : () => void;
}

function WelcomeDialog (props: WelcomeDialogProps) {
    const {open, onClose} = props;
    
    const [isLoginDialogOn, setIsLoginDialogOn] = useState(false);
    const isLoginIn = useSelector((state: RootState) => state.auth.isLoginIn);

    const {classes} = useStyles();

    const handleLogin = () => {
        setIsLoginDialogOn(true);
    }

    const handleLoginClose = () => {
        setIsLoginDialogOn(false);
    }

    const handleBackdropClick = (event: { stopPropagation: () => void; }) => {
        event.stopPropagation();
    };

    return (
        <Backdrop
            sx={(theme) => ({ backgroundColor: '#000000b3', zIndex: theme.zIndex.drawer + 1 })}
            open={open}
            onClick={onClose}>
            <Stack
                className={classes.stackContainer}
                onClick={handleBackdropClick}>
                <img 
                    className={classes.robot}
                    src="/assets/menu/menu_welcome.svg"/>
                <h1>WELCOME TO THE TERRITORY</h1>
                <p>You need to log in to proceed. Please log in first.</p>
                {
                    isLoginIn ? (
                        <Button 
                            variant="contained"
                            onClick={handleLogin}>
                            Start
                        </Button>
                    ): (
                        <Button 
                            variant="contained"
                            onClick={handleLogin}>
                                Login
                        </Button>
                    )
                }
            </Stack>
            <LoginDialog 
                open={isLoginDialogOn}
                onClose={handleLoginClose}/>
        </Backdrop>
    ); 
}

const useStyles  = makeStyles() ({
    welcomeContainer: {

    },
    stackContainer: {
        alignItems: "center",
    },
    robot: {
        width: "200px",
        height: "auto",
    }
});


export default WelcomeDialog;
