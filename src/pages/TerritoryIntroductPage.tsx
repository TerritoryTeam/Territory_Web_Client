import { makeStyles } from "tss-react/mui";

import { 
    Stack, 
    Typography 
} from "@mui/material";

const TerritoryIntroducePage = () => {
    const {classes} = useStyles();

    return (
        <Stack>
            <img className={classes.logo} src="/assets/logo.png"></img>
            <Typography variant="body1">
                MMO Sandbox Game for Programmers
            </Typography> 
        </Stack>
    )
}

const useStyles = makeStyles() ({
    logo: {
        width: "480px",
        height: "auto",
    }
})

export default TerritoryIntroducePage