
import { Scene } from 'phaser';

export class RoomScene extends Scene
{
    private gridSize: number = 16; 
    private rows: number = 50;     
    private cols: number = 50;    
    private grid: Phaser.GameObjects.Rectangle[][] = [];
    private scaleFactor: number = 1;

    constructor ()
    {
        super('RoomScene');
    }

    preload ()
    {
    }

    create ()
    {
        this.createGrid();

        this.registerSceneEvent();
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

    private registerCellEvent(row : number, col : number) {
        this.grid[row][col].setInteractive();
        this.grid[row][col].on('pointerdown', () => {
            const color = Phaser.Display.Color.RandomRGB().color
            this.grid[row][col].setFillStyle(color);
        });
    }

    private reigsterSceneEvent() {
        this.input.on('pointerwheel', this.onPointerWheel, this);
    }

    private onPointerWheel(pointer: Phaser.Input.Pointer, x: number, y: number, deltaX: number, deltaY: number) {
        // 缩放速率
        const scaleSpeed = 0.1;
    
        // 根据滚轮方向调整缩放比例
        if (deltaY < 0) {
          // 滚轮向上滚动（放大）
            this.scaleFactor += scaleSpeed;
        } else if (deltaY > 0) {
          // 滚轮向下滚动（缩小）
            this.scaleFactor -= scaleSpeed;
        }
    
        // 限制缩放比例在一定范围内
        this.scaleFactor = Phaser.Math.Clamp(this.scaleFactor, 0.5, 2); // 缩放范围：0.5到2倍
    
        // 更新网格的缩放
        this.updateGridScale();
      }

    private updateGridScale() {
    }
}
