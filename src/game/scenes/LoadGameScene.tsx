export default class LoadGameScene extends Phaser.Scene {
    private preLoadCompleted: boolean = false;

    constructor() {
        super('LoadGameScene');
    }

    preload() {
        this.load.image('logo', 'assets/logo.png');
        this.load.image('background', 'assets/background.png');

        this.load.on('complete', () => {	
            this.preLoadCompleted = true;
        });
    }
}