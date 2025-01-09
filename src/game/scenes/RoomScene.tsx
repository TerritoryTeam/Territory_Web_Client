
import { Scene } from 'phaser';
import { globalContainer } from '../../providers/GlobalProvider';
import { UserJoinLeaveMessage } from '../../territory';

export class RoomScene extends Scene
{
    private gridSize: number = 16; 
    private rows: number = 50;     
    private cols: number = 50;    
    private grid: Phaser.GameObjects.Rectangle[][] = [];

    constructor ()
    {
        super('RoomScene');
    }

    preload ()
    {
        globalContainer.nakama.joinMatch("12345");


    }

    create ()
    {
        this.nakamaListener();
        
        this.createGrid();
    }

    private createGrid() {    
        const { width, height } = this.cameras.main;

        const startX = (width - this.cols * this.gridSize) / 2;
        const startY = (height - this.rows * this.gridSize) / 2;

        for (let row = 0; row < this.rows; row++) {
            this.grid[row] = [];
            for (let col = 0; col < this.cols; col++) {
                const cell = this.add.rectangle(
                    startX + col * this.gridSize,
                    startY + row * this.gridSize,
                    this.gridSize,
                    this.gridSize,
                    0x000000
                  )
                  .setOrigin(0, 0);
                
                this.grid[row][col] = cell;

                cell.setStrokeStyle(2, 0xffffff);

                this.registerCellEvent(row, col);
            }
        }
    }

    private nakamaListener() {
        globalContainer.nakama.socket.onmatchdata = (result) => {
            switch (result.op_code) {
                case 1:
                case 2:
                    console.log("User Joined or Leave");
                    const data = UserJoinLeaveMessage.fromBinary(result.data)
                    console.log(data);
                    break;
                default:
                    console.log("Unknown OpCode");
            }
        };
    }

    private registerCellEvent(row : number, col : number) {
        this.grid[row][col].setInteractive();
        this.grid[row][col].on('pointerdown', () => {
            const color = Phaser.Display.Color.RandomRGB().color
            this.grid[row][col].setFillStyle(color);
        });
    }
}
