import { useRef, useState } from "react"
import { makeStyles } from "tss-react/mui"

import { Box } from "@mui/material"

import { useAppSelector } from "../hook"

import LoginDialog from "../components/LoginPanel"
import WorldSelectionPanel from "../components/WorldSelectionPanel"
import RoomSelectedPanel from "../components/RoomSelectedPanel"
import { 
    IRefPhaserGame,
    TerritoryGame,
} from "../game/TerritoryGame"
import RoomOperatorPanel from "../components/RoomOperatorPanel"
import BootstrapScene from "../game/scenes/BootstrapScene"

const TerritoryGameWorldPage = () => {
    const {classes} = useStyles()

    const [isLoginDialogOn, setIsLoginDialogOn] = useState(false)
    const handleLoginDialog = () => {
        setIsLoginDialogOn(!isLoginDialogOn)
    }

    const loggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const worldJoined = useAppSelector(state => state.world.worldJoined)
    const roomJoined = useAppSelector(state => state.world.roomJoined)

    const phaserRef = useRef<IRefPhaserGame | null>(null)

    let ui : JSX.Element
    if (loggedIn) {
        if (!worldJoined) {
            ui = <WorldSelectionPanel />
        } else if (!roomJoined) {
            // change to room selector scene
            if (phaserRef.current) {
                let bootstrap = (phaserRef.current.game as Phaser.Game).scene.getScene('BootstrapScene') as BootstrapScene
                bootstrap.launchRoomSelector()
                console.log('launch room selector scene')
            }
            ui = <RoomSelectedPanel />
        } else {
            ui = <RoomOperatorPanel />
        }
    } else {
        setIsLoginDialogOn(true)
        ui = <LoginDialog 
            open={isLoginDialogOn}
            onClose={handleLoginDialog} />
    }

    return (
        <Box className={classes.backdropContainer}>
            <div 
                className={classes.uiContainer}>
                {ui}
            </div>
            {
                worldJoined ?
                    <TerritoryGame ref={phaserRef} /> :
                    null
            }
        </Box>
    )
}

const useStyles = makeStyles() ({
    backdropContainer: {
        position: 'relative',
        height: '100%',
        width: '100%',
    },
    uiContainer: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: 1,
    }
})

export default TerritoryGameWorldPage