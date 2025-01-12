import { 
    forwardRef, 
    useLayoutEffect, 
    useRef,
} from "react";
import { makeStyles } from "tss-react/mui";

import StartTerritoryGame from "./main";

export interface IRefPhaserGame
{
    game: Phaser.Game | null;
    scene: Phaser.Scene | null;
}

interface IProps {
    currentActiveScene?: (scene_instance : Phaser.Scene) => void;
}

export const TerritoryGame = forwardRef<IRefPhaserGame, IProps>(function TerritoryGame({currentActiveScene}, ref)
{
    const {classes} = useStyles();

    const game = useRef<Phaser.Game | null>(null);

    useLayoutEffect(() => {
        if (game.current == null) {
            game.current = StartTerritoryGame("game-container");

            if (typeof ref === 'function') {
                ref({game: game.current, scene: game.current.scene.getAt(0)});
            } else if (ref) {
                ref.current = {game: game.current, scene: null};
            }
        }

        return () => {
            if (game.current) {
                game.current.destroy(true);
                if (game.current !== null) {
                    game.current = null;
                }
            }
        }
    }, [ref]);

    return (
        <div 
            id="game-container"
            className={classes.gameContainer}></div>
    );
})

const useStyles = makeStyles() ({
    gameContainer: {
        position: "absolute",
        top: "0",
        overflow: "hidden",
        height: "100%",
        width: "100%",
    }
})
