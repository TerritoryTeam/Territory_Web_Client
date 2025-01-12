import { AUTO, Game } from 'phaser';

import { RoomScene } from './scenes/RoomScene';
import { RoomSelectorScene } from './scenes/RoomSelectorScene';
import LoadGameScene from './scenes/LoadGameScene';


//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        LoadGameScene,
        RoomSelectorScene,
        RoomScene,
    ]
};

const StartTerritoryGame = (parent: string) => {
    return new Game({ ...config, parent });

}

export default StartTerritoryGame;
