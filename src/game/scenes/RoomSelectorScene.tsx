import { Scene } from "phaser";

export class RoomSelectorScene extends Scene
{
    private gridSize: number = 16; 
    private rows: number = 50;     
    private cols: number = 50;    
    private grid: Phaser.GameObjects.Rectangle[][] = [];

    constructor ()
    {
        super('RoomSelectorScene');
    }

    preload ()
    {
        // globalContainer.nakama.joinMatch("12345");
    }

    create ()
    {
        // this.nakamaListener();
        
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

                // this.registerCellEvent(row, col);
            }
        }
    }

    // private nakamaListener() {
    //     globalContainer.nakama.socket.onmatchdata = (result) => {
    //         const message = UserJoinLeaveMessage.decode(new Uint8Array(result.data));
    //         console.log(message);
    //     }
    // }
}