import { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";


import WelcomePanel from "../components/WelcomePanel";
import GameBar from "../components/AppBar";

const HomePage = () => {
    const [open, setOpen] = useState(false);

    const {classes} = useStyles();

    useEffect(() => {
        setTimeout(() => {
            setOpen(true);
            }, 200);
    })

    const handleWelcomeClose = () => {
        setOpen(false);
    }
    
    return (
        <div className={classes.homeContainer}>
            <GameBar />
            <WelcomePanel 
                open={open}
                onClose={handleWelcomeClose}
            />
        </div>
    );
};

const useStyles = makeStyles() ({
    homeContainer: {
        height: "100vh",
        backgroundColor: "#6575A8"
    }
})

export default HomePage;