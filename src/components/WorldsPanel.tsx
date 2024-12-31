import { useState } from "react";
import { makeStyles } from "tss-react/mui";
import { 
    Box,
    Card,
    Divider,
    Stack,
} from "@mui/material";

function WorldPanel () {
    const {classes} = useStyles();

    const [time, setTime] = useState(new Date());
    const factions = [
        {
            name: "MechaniX",
            avatar: "tech_1.svg",
            summary: "Has the advantage of automation and sheer numbers, but their units lack flexibility and mobility. They are best suited for large-scale battles.",
            color: "#FF7378"
        }, 
        {
            name: "XenoBio",
            avatar: "tech_2.svg",
            summary: "Provides adaptability and powerful evolution options, making them excellent for fluid, dynamic playstyles, but they require more micromanagement and strategic planning.",
            color: "#47B165",
        },
        {
            name: "Energia",
            avatar: "tech_3.svg",
            summary: "Offers unparalleled firepower and strong defenses, but their dependency on energy requires careful planning. Without energy, their units become weak and vulnerable.",
            color: "#CCBC30",
        }
    ]

    const worlds = [
        {
            name: "Terra",
            avatar: "biomass.svg"
        },
        {
            name: "Mars",
            avatar: "energy.svg"
        },
        {
            name: "Venus",
            avatar: "metal.svg"
        },
        {
            name: "Jupiter",
            avatar:"power.svg"
        },
    ]
    
    setInterval(
        () => tick(),
        1000
    );
      
    const tick = () => {
        setTime(new Date());
    }

    return (
        <Stack 
            spacing={5}
            className={classes.worldPanelContainer}>
            <Stack
                direction="row"
                spacing={13}
                className={classes.factionsContainer}>
                {
                    factions.map((faction, index) => {
                        return (
                            <Stack
                                direction="column"
                                className={classes.factionItem}
                                key={index}>
                                <img 
                                    className={classes.factionAvatar}
                                    src={`/assets/worlds/${faction.avatar}`}
                                    alt={faction.name} />
                                <p style={{ color: faction.color }}>{faction.name}</p>
                            </Stack>
                        );
                    })
                }
            </Stack>
            <Divider>
                <p className={classes.clock}>
                    {Math.floor((7 - time.getDay() - 1 + (24 - time.getHours()) / 24) % 7)}D 
                    {23 - time.getHours()}H
                    {59 - time.getMinutes()}M
                    {59 - time.getSeconds()}S
                </p>
            </Divider>
            <Stack
                direction="row"
                spacing={2}
                className={classes.worldsContainer}>
                {
                    worlds.map((world, index) => {
                        return (
                            <Card
                                className={classes.worldItem}
                                key={index}>
                                <img 
                                    className={classes.worldItemAvatar}
                                    src={`/assets/worlds/${world.avatar}`}
                                    alt={world.name} />
                                <p>{world.name}</p>
                            </Card>
                        );
                    })
                }
            </Stack>
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
        backgroundColor: "#22242A",
        width: "137px",
        height: "137px",
        color: "#D4D4D4"
    },
    worldItemAvatar: {
        width: "83px",
        height: "auto",
    },
});


export default WorldPanel;

