export default class BootstrapScene extends Phaser.Scene {
    constructor() {
        super('BootstrapScene');
    }

    preload() {
    }

    launchRoomSelector() {
        this.scene.start('RoomSelectorScene');
    }
}