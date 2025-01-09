import { useState } from "react"
import { makeStyles } from "tss-react/mui"

import { Box } from "@mui/material"

import { useAppSelector } from "../hook"

import LoginDialog from "../components/LoginPanel"

import WorldSelectionPanel from "../components/WorldSelectionPanel"
import RoomSelectedPanel from "../components/RoomSelectedPanel"

const TerritoryGameWorldPage = () => {
    const {classes} = useStyles()

    const [isLoginDialogOn, setIsLoginDialogOn] = useState(false)
    const handleLoginDialog = () => {
        setIsLoginDialogOn(!isLoginDialogOn)
    }

    const loggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const worldJoined = useAppSelector(state => state.world.worldJoined)
    const roomJoined = useAppSelector(state => state.world.roomJoined)

    let ui : JSX.Element
    if (loggedIn) {
        if (!worldJoined) {
            ui = <WorldSelectionPanel />
        } else if (!roomJoined) {
            ui = <RoomSelectedPanel />
        } else {
            ui = (
                <div>GameWorld</div>
            )
        }
    } else {
        setIsLoginDialogOn(true)
        ui = <LoginDialog 
            open={isLoginDialogOn}
            onClose={handleLoginDialog} />
    }

    return (
        <Box className={classes.backdropContainer}>
            {ui}
        </Box>
    )
}

const useStyles = makeStyles() ({
    backdropContainer: {
        height: '100%',
        width: '100%',
    }
})

export default TerritoryGameWorldPage