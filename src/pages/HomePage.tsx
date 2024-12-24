import { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";

import GameBar from "../components/GameBar";
import WelcomeDialog from "../components/WelcomePanel";

const HomePage = () => {
    const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);

    const {classes} = useStyles();

    useEffect(() => {
        setTimeout(() => {
            setIsWelcomeOpen(true);
            }, 200);
    }, [])

    const handleWelcomeClose = () => {
        setIsWelcomeOpen(false);
    }
    
    return (
        <div className={classes.homeContainer}>
            <GameBar />
            <WelcomeDialog 
                open={isWelcomeOpen}
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