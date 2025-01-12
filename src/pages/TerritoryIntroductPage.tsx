import { makeStyles } from "tss-react/mui";

import { 
    Box,
    Stack, 
    Typography 
} from "@mui/material";

const TerritoryIntroducePage = () => {
    const {classes} = useStyles();

    return (
        <Stack
            className={classes.rootContainer}>
            <img className={classes.logo} src="/assets/logo.png"></img>
            <Typography variant="h4">
                MMO Sandbox Game for Programmers
            </Typography> 
        </Stack>
    )
}

const useStyles = makeStyles() ({
    rootContainer: {
        marginTop: "20px",
        alignItems: "center",
    },
    logo: {
        width: "480px",
        height: "auto",
    }
})

export default TerritoryIntroducePage