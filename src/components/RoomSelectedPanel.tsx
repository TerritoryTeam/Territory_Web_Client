import { makeStyles } from "tss-react/mui";
import { 
  Button, 
  IconButton, 
  Paper, 
  Snackbar
} from "@mui/material";
import { useState } from "react";
import { useAppSelector } from "../hook";

function RoomSelectedPanel () {
  const {classes} = useStyles();
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const room = useAppSelector(state => state.world.room)

  const handleRoomSelect = () => {
    if (room == null) {
      setSnackbarOpen(true)
    } else {
      console.debug('select room:', room.roomX, ',' , room.roomY)
    }
  }

  const randomRoomSelect = () => {
    console.debug('random select room')
  }

  return (
    <Paper 
      className={classes.rootContainer}>
        <span
          className={classes.description}>
          Select Your Room 
        </span>
        <Button 
          className={classes.confirmButton}
          onClick={handleRoomSelect}
          variant="contained">
            Confirm
        </Button>
        <IconButton
          onClick={randomRoomSelect}>
          <img 
            src="/assets/worlds/dice.svg" 
            className={classes.dice}/>
        </IconButton>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center'  }}
          open={snackbarOpen}
          message="Select Room First"
        />
    </Paper>
  );
};

const useStyles = makeStyles() ({
  rootContainer: {
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    background: "#000000b3",
    textAlign: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  description: {
    fontSize: "27px",
    color: "white",
    userSelect: "none",
  },
  confirmButton: {
    marginLeft: "20px",
  },
  dice: {
    marginLeft: "25px",
    height: "45px",
  }
})

export default RoomSelectedPanel;