import Phaser from 'phaser';
import { RoomScene } from './scenes/RoomScene';


// Find out more information about the Game Config at:
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth, 
    height: window.innerHeight, 
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        RoomScene,
    ]
};

const StartGame = (parent : string) => {

    return new Phaser.Game({ ...config, parent });

}

export default StartGame;