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
            let roomJoinedSceneKey = 'RoomSelectorScene'
            if (phaserRef.current) {
                let sceneStarted = false
                phaserRef.current.game?.scene.getScenes(true).forEach(element => {
                    if (element.scene.key === roomJoinedSceneKey) {
                        sceneStarted = true
                    }
                });

                if (!sceneStarted) {
                    phaserRef.current.game?.scene.start(roomJoinedSceneKey)
                    console.log('launch room selector scene')
                }
                
            }
            else {
                console.log('phaser ref is null')
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
            {ui}
            <TerritoryGame ref={phaserRef} />
        </Box>
    )
}

const useStyles = makeStyles() ({
    backdropContainer: {
        position: 'relative',
        height: '100%',
        width: '100%',
    },
})

export default TerritoryGameWorldPage