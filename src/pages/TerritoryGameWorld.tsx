import { 
    useRef,
    useState, 
} from "react";
import { makeStyles } from "tss-react/mui";

import {
    Box, 
    Collapse, 
    List, 
    ListItemButton, 
    ListItemText, 
    Paper, 
    Stack,
} from "@mui/material";

import { 
    IRefPhaserGame, 
    PhaserGame 
} from "../game/PhaserGame";
import WorldPanel from "../components/WorldsPanel";
import { useAppSelector } from "../hook";


const TerritoryGameWorld = () => {
    const {classes} = useStyles();

    const phaserRef = useRef<IRefPhaserGame | null>(null);

    const isSelectedWorld = useAppSelector((state) => state.world.isSelectedWorld);

    const [expanded, setExpanded] = useState(false)
    const [isDragging, setIsDragging] = useState(false);
    

    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        const offsetX = e.clientX - position.x;
        const offsetY = e.clientY - position.y;
        setIsDragging(true);

        const handleMouseMove = (moveEvent: MouseEvent) => {
            if (isDragging) {
                setPosition({
                    x: moveEvent.clientX - offsetX,
                    y: moveEvent.clientY - offsetY,
                });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };


    return (
        <Stack 
            direction="column"
            className={classes.rootContainer}>
            <Stack
                className={classes.worldViewer}
                direction="row">
                <Box 
                    onMouseDown={handleMouseDown}
                    className={classes.worldContainer}>
                        {
                            !isSelectedWorld ? 
                                <WorldPanel /> :
                                <PhaserGame ref={phaserRef} />
                        }
                </Box>
                
                {
                    isSelectedWorld &&
                        <Paper
                            className={classes.rightTopController}>
                            <List>
                                <Box>
                                    <ListItemButton
                                        onClick={() => setExpanded(!expanded)}>
                                        <ListItemText primary="Test"></ListItemText>
                                    </ListItemButton>
                                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                                        Test
                                    </Collapse>
                                </Box>
                            </List>
                        </Paper>
                }
                
            </Stack>
            {
                isSelectedWorld &&
                    <Box
                        className={classes.BottomContainer}>
                        Bottom
                    </Box>
            }
        </Stack>
    )
}

const useStyles = makeStyles() ({
    rootContainer: {
        flex: 1,
        overflowY: "auto",
        backgroundColor: "#202020"
    },
    worldViewer: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        overflowY: "auto",
    },
    worldContainer: {
        flex: 1,
        height: "100%",
        overflowY: "auto",
        overflow: "hidden",
    },
    rightTopController: {
        width: "300px",
        height: "100%",
        background: "#2d2d2d",
    },
    BottomContainer: {
        height: "100px",
    }
})

export default TerritoryGameWorld;