import { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";

import { useAppSelector } from "../hook";

import GameBar from "../components/GameBar";
import WelcomeDialog from "../components/WelcomePanel";

import TerritoryGameWorldPage from "./TerritoryGameWorldPage";
import TerritoryIntroducePage from "./TerritoryIntroductPage";

const HomePage = () => {
    const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);


    const {classes} = useStyles();

    useEffect(() => {
        setTimeout(() => {
            setIsWelcomeOpen(true);
            }, 200);
    }, [])

    const handleWelcomeClose = () => {
        setIsWelcomeOpen(false);
    }

    let ui : JSX.Element;

    if (isLoggedIn) {
        ui = <TerritoryGameWorldPage />
    } else {
        ui = <TerritoryIntroducePage />
    }
    
    return (
        <div className={classes.homeContainer}>
            <GameBar />
            {ui}
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
        backgroundColor: "#6575A8",
        display: "flex",
        flexDirection: "column",
    }
})

export default HomePage;