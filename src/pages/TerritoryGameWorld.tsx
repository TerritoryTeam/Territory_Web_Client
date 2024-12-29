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


const TerritoryGameWorld = () => {
    const {classes} = useStyles();

    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const [expanded, setExpanded] = useState(false)
    
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const divRef = useRef(null); // 用于引用div元素

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        // 记录鼠标点击时的初始位置
        const offsetX = e.clientX - position.x;
        const offsetY = e.clientY - position.y;
        setIsDragging(true);

        // 设置鼠标移动事件，动态更新位置
        const handleMouseMove = (moveEvent: MouseEvent) => {
            if (isDragging) {
                setPosition({
                    x: moveEvent.clientX - offsetX,
                    y: moveEvent.clientY - offsetY,
                });
            }
        };

        // 监听鼠标移动
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
                    <PhaserGame 
                        ref={phaserRef}
                        />
                </Box>
                
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
            </Stack>
            <Box
                className={classes.BottomContainer}>
                Bottom
            </Box>
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
        background: "#0031FF",
        overflow: "hidden",
    },
    rightTopController: {
        width: "300px",
        height: "100%",
        background: "#2d2d2d",
    },
    BottomContainer: {
        height: "100px",
        background: "#FF00FF"
    }
})

export default TerritoryGameWorld;