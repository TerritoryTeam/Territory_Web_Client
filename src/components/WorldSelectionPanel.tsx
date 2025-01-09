import { 
    useState 
} from "react";

import { useQuery } from "react-query";
import { makeStyles } from "tss-react/mui";

import { 
    Alert,
    Box,
    Button,
    Card,
    LinearProgress,
    Snackbar,
    Stack,
    Typography,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../hook";
import { globalContainer } from "../providers/GlobalProvider";
import { joinGameWorld } from "../stores/slices/WorldSlice";
import { World } from "../models/worlds";

function WorldSelectionPanel () {
    const {classes} = useStyles()
    const dispatch = useAppDispatch()

    const lobbyJoined = useAppSelector(state => state.world.lobbyJoined)

    const [showSnackbar, setShowSnackbar] = useState(false)
    const [selectedWorldIndex, setSelectedWorldIndex] = useState(0);
    const [time, setTime] = useState(new Date());

    const { 
        data: worlds, 
        isSuccess: isWorldsSuccess,
        isFetching: isWorldsFetching, 
        isError: isWorldsError, 
        error: worldsError,
    } = useQuery(
        ['fetchWorlds'],
        async () => {
            return await globalContainer.nakama.fetchAvailableWorlds();
        },
        {
            enabled: lobbyJoined,
            staleTime: 1000 * 60 * 60 * 24,
        });

    const tick = () => {
        setTime(new Date());
    }

    const handleJoinWorld = (world : World) => {
        dispatch(joinGameWorld(world));
    }

    setInterval(
        () => tick(),
        1000
    );

    return (
        <div
            className={classes.rootContainer}>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={showSnackbar}
                autoHideDuration={3000}
                onClose={() => setShowSnackbar(false)}
            >
                <Alert
                    severity="error"
                    variant="outlined"
                    // overwrites the dark theme on render
                    style={{ background: '#fdeded', color: '#7d4747' }}
                    >
                    Connecting to server, please try again!
                </Alert>
            </Snackbar>
            <Box>
                <Typography variant="h3">Welcome to Territory</Typography>
                <Typography variant="h5">Select your world:</Typography>
                <Stack
                    direction="row"
                    spacing={2}
                    className={classes.worldsContainer}>
                    {
                        worlds && worlds.map((world, index) => {
                            return (
                                <Card
                                    className={selectedWorldIndex == index ? classes.selectedWorld : classes.worldItem }
                                    onClick={() => setSelectedWorldIndex(index)}
                                    key={index}>
                                    <img 
                                        className={classes.worldItemAvatar}
                                        src={(selectedWorldIndex == index ? `/assets/worlds/${world.selectedAvatar}` : `/assets/worlds/${world.avatar}`)}
                                        alt={world.name} />
                                    <Typography variant="h5">{world.name}</Typography>
                                </Card>
                            );
                        })
                    }
                </Stack>
                <Button 
                    variant="contained"
                    disabled={!isWorldsSuccess || !lobbyJoined}
                    onClick={() => handleJoinWorld(worlds![selectedWorldIndex])}>
                    Join World  
                </Button>
                <Box>
                    <p>World will be regenerated after </p>
                    <p className={classes.clock}>
                        {Math.floor((7 - time.getDay() - 1 + (24 - time.getHours()) / 24) % 7)}D 
                        {23 - time.getHours()}H
                        {59 - time.getMinutes()}M
                        {59 - time.getSeconds()}S
                    </p>
                </Box>

            </Box>
            {!lobbyJoined && (
                <div className={classes.connectionContainer}>
                    <h3> Connecting to server...</h3>
                    <LinearProgress 
                        className={classes.connectionProgress}
                        color="secondary" 
                        />
                </div>
            )}
        </div>
    )
}

const useStyles = makeStyles() ({
    rootContainer: {
        height: "100%",
        paddingTop: "47px",
        backgroundColor: "#191B21",
        textAlign: "center",
        alignItems: "center",
    },
    connectionContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        "& h3": {
            color: "#33ac96",
        }
    },
    connectionProgress: {
        width: "360px",
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
        justifyContent: "center",
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
})


export default WorldSelectionPanel;

