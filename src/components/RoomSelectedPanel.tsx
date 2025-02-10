import { makeStyles } from "tss-react/mui";
import { IconButton, Paper } from "@mui/material";

function RoomSelectedPanel () {
  const {classes} = useStyles();

  return (
    <Paper 
      className={classes.rootContainer}>
        <span
          className={classes.description}>
          Select Your Room 
        </span>
        <IconButton>
          <img 
            src="/assets/worlds/dice.svg" 
            className={classes.dice}/>
        </IconButton>
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
  dice: {
    marginLeft: "25px",
    height: "45px",
  }
})

export default RoomSelectedPanel;