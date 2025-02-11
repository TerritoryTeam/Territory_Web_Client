import { Scene } from "phaser";
import store from "../../stores";
import { Room } from "../../territory";

export class RoomSelectorScene extends Scene
{
    private map: Phaser.Tilemaps.Tilemap;
    private layerRoom: Phaser.Tilemaps.TilemapLayer | null;
    private layerOwner: Phaser.Tilemaps.TilemapLayer | null;
    private highlight: Phaser.GameObjects.Rectangle;

    constructor ()
    {
        super('RoomSelectorScene');
    }

    preload() {
        this.load.image('rooms', 'assets/map/RoomSelector.png')
        this.load.image('logos', 'assets/map/RoomOwnerLogo.png')
    }

    create ()
    {
        this.tilesInit()

        store.subscribe(() => this.updateRooms())
        this.updateRooms()

        this.highlight = this.add.rectangle(0, 0, 50, 50, 0xADD8E6, 0.5)
        this.highlight.setOrigin(0)
        this.highlight.setVisible(false)
        
        this.layerRoom!.setInteractive()
        this.layerRoom!.on('pointermove', this.highlightRecMove, this);

        this.layerRoom!.on('pointerout', () => {
            this.highlight.setVisible(false)
        })
    }

    highlightRecMove(pointer : Phaser.Input.Pointer) {
        console.log("Pointer:", pointer.worldX, ":", pointer.worldY)
        const tile = this.layerRoom!.getTileAtWorldXY(pointer.worldX, pointer.worldY)

        if (tile) {
            console.log("tile:", tile.pixelX, tile.pixelY)
            this.highlight.setPosition(tile.pixelX, tile.pixelY);
            this.highlight.setVisible(true);
        } else {
            console.log("pointer outof tilemap")
            this.highlight.setVisible(false)
        }
    }

    tilesInit() {
        this.map = this.make.tilemap({
            key: 'world',
            tileHeight: 50,
            tileWidth: 50,
        })
        const roomTiles = this.map.addTilesetImage(
            'rooms',
            'rooms',
            50,
            50);
        const logoTiles = this.map.addTilesetImage(
            'owners',
            'logos',
            50,
            50)

        this.layerRoom = this.map.createBlankLayer('rooms', roomTiles!, 0, 0)
        this.layerOwner = this.map.createBlankLayer('owners', logoTiles!, 0, 0)
    }

    updateRooms() {
        const state = store.getState()
        
        if (!state.world.worldRooms.length) return

        for (const room of state.world.worldRooms) {
            this.layerRoom?.putTileAt(1, room.roomX, room.roomY)

            if (room.userOwner) {
                const randomIndex = Phaser.Math.Between(0, 5);
                this.layerOwner?.putTileAt(randomIndex, room.roomX, room.roomY);
            }
        }
    }
}