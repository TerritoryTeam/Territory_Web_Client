import { useState } from "react";
import { makeStyles } from "tss-react/mui";
import { 
    Box,
    Button,
    Card,
    Divider,
    Snackbar,
    Stack,
} from "@mui/material";

import { selectWorld } from "../stores/slices/WorldSlice";
import { useAppDispatch, useAppSelector } from "../hook";

function WorldPanel () {
    const {classes} = useStyles();
    const dispatch = useAppDispatch();

    const isLoginIn = useAppSelector((state) => state.auth.loginStatus === 'success');
    
    const [time, setTime] = useState(new Date());
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [selectedFactionIndex, setSelectedFactionIndex] = useState(0);
    const [selectedWorldIndex, setSelectedWorldIndex] = useState(0);

    const factions = [
        {
            name: "MechaniX",
            avatar: "faction_mechanix.svg",
            selectedAvatar: "faction_mechanix_hover.svg",
            summary: "Has the advantage of automation and sheer numbers, but their units lack flexibility and mobility. They are best suited for large-scale battles.",
            color: "#FF7378"
        }, 
        {
            name: "XenoBio",
            avatar: "faction_xenobio.svg",
            selectedAvatar: "faction_xenobio_hover.svg",
            summary: "Provides adaptability and powerful evolution options, making them excellent for fluid, dynamic playstyles, but they require more micromanagement and strategic planning.",
            color: "#47B165",
        },
        {
            name: "Energia",
            avatar: "faction_energia.svg",
            selectedAvatar: "faction_energia_hover.svg",
            summary: "Offers unparalleled firepower and strong defenses, but their dependency on energy requires careful planning. Without energy, their units become weak and vulnerable.",
            color: "#CCBC30",
        }
    ]

    const worlds = [
        {
            name: "Terra",
            avatar: "biomass.svg",
            selectedAvatar: "biomass_hover.svg"
        },
        {
            name: "Mars",
            avatar: "energy.svg",
            selectedAvatar: "energy_hover.svg"
        },
        {
            name: "Venus",
            avatar: "metal.svg",
            selectedAvatar: "metal_hover.svg"
        },
        {
            name: "Jupiter",
            avatar:"power.svg",
            selectedAvatar: "power_hover.svg"
        },
    ]
    
    setInterval(
        () => tick(),
        1000
    );
      
    const tick = () => {
        setTime(new Date());
    }

    const snackBarAlert = (message: string) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    }

    const handleStartGame = () => {
        if (!isLoginIn) {
            snackBarAlert("Please login to start the game.");
            return
        }

        dispatch(selectWorld({
            world: {
                Name: worlds[selectedWorldIndex].name,
                Id: selectedWorldIndex.toString()
            },
            faction: {
                Name: factions[selectedFactionIndex].name,
                Id: selectedFactionIndex.toString()
            }
        }));
    }

    return (
        <Stack 
            spacing={5}
            className={classes.worldPanelContainer}>
            <Box>
                <Divider
                    className={classes.divider}>Factions</Divider>
                <Stack
                    direction="row"
                    spacing={13}
                    className={classes.factionsContainer} >
                    {
                        factions.map((faction, index) => {
                            return (
                                <Card
                                    className={(selectedFactionIndex === index ? classes.selectedFaction : classes.factionItem)}
                                    onClick={() => setSelectedFactionIndex(index)}
                                    key={index}>
                                    <img
                                        className={classes.factionAvatar}
                                        src={(selectedFactionIndex === index ? `/assets/worlds/${faction.selectedAvatar}` : `/assets/worlds/${faction.avatar}`)}
                                        alt={faction.name}/>
                                    <p style={{ color: faction.color }}>{faction.name}</p>
                                </Card>
                            );
                        })
                    }
                </Stack>
            </Box>

            <Box>
                <Divider
                    className={classes.divider}>Available Worlds</Divider>
                <Stack
                    direction="row"
                    spacing={2}
                    className={classes.worldsContainer}>
                    {
                        worlds.map((world, index) => {
                            return (
                                <Card
                                    className={selectedWorldIndex == index ? classes.selectedWorld : classes.worldItem }
                                    onClick={() => setSelectedWorldIndex(index)}
                                    key={index}>
                                    <img 
                                        className={classes.worldItemAvatar}
                                        src={(selectedWorldIndex == index ? `/assets/worlds/${world.selectedAvatar}` : `/assets/worlds/${world.avatar}`)}
                                        alt={world.name} />
                                    <p>{world.name}</p>
                                </Card>
                            );
                        })
                    }
                </Stack>
                <p>World will be regenerated after </p>
                <p className={classes.clock}>
                    {Math.floor((7 - time.getDay() - 1 + (24 - time.getHours()) / 24) % 7)}D 
                    {23 - time.getHours()}H
                    {59 - time.getMinutes()}M
                    {59 - time.getSeconds()}S
                </p>
            </Box>
            <Button
                variant="contained"
                onClick={handleStartGame}>
                Start Game
            </Button>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
                />
        </Stack>
    ); 
}

const useStyles  = makeStyles() ({
    worldPanelContainer: {
        height: "100%",
        paddingTop: "47px",
        backgroundColor: "#191B21",
        textAlign: "center",
        alignItems: "center",
    },
    factionsContainer: {
        
    },
    factionItem: {
        userSelect: "none",
        alignItems: "center",
        width: "140px",
        height: "150px",
        backgroundColor: "#22242A",
        filter: "grayscale(1)",

        "&: hover": {
            filter: "grayscale(0)",
            boxShadow: "0 0 30px 0",
            cursor: "pointer",
        }
    },
    selectedFaction: {
        userSelect: "none",
        alignItems: "center",
        width: "140px",
        height: "150px",
        backgroundColor: "#22242A",
        filter: "grayscale(0)",
        boxShadow: "0 0 30px 0",
    },
    factionAvatar: {
        width: "93px",
        height: "auto",
    },
    clock: {
        width: "400px",
        padding: "10px",
        margin: "20px auto 0",
        borderTop: "1px solid lightgray",
        borderBottom: "1px solid lightgray",
        textAlign: "center",
        fontSize: "1.5em",
        letterSpacing: ".8em",
        fontWeight: "100",
    },
    worldsContainer: {

    },
    worldItem: {
        userSelect: "none",
        backgroundColor: "#22242A",
        width: "137px",
        height: "137px",
        color: "#D4D4D4",
        filter: "grayscale(1)",

        "&: hover": {
            filter: "grayscale(0)",
            boxShadow: "0 0 30px 0",
        }
    },
    worldItemAvatar: {
        userSelect: "none",
        width: "83px",
        height: "auto",
    },
    selectedWorld: {
        userSelect: "none",
        filter: "grayscale(0)",
        backgroundColor: "#22242A",
        width: "137px",
        height: "137px",
        color: "#D4D4D4",
        boxShadow: "0 0 30px 0",
    },
    divider: {
        fontSize: "18px",
        fontWeight: "100",
        letterSpacing: ".1em",
        textAlign: "center",
        color: "#D4D4D4",
        margin: "0 0 20px",
    },
});


export default WorldPanel;

