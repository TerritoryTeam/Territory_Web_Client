import { Scene } from "phaser";

import store from "../../stores";
import { Room } from "../../territory";
import { tryJoinRoom } from "../../stores/slices/WorldSlice";

export class RoomSelectorScene extends Scene
{
    private map: Phaser.Tilemaps.Tilemap;
    private layerRoom: Phaser.Tilemaps.TilemapLayer | null;
    private layerOwner: Phaser.Tilemaps.TilemapLayer | null;
    
    private recHoverRoom: Phaser.GameObjects.Rectangle;
    private recSelectedRoom: Phaser.GameObjects.Rectangle;
    private selectedTile: Phaser.Tilemaps.Tile | null = null;
    
    private roomMap: Map<string, Room> = new Map();

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

        this.recHoverRoom = this.add.rectangle(0, 0, 50, 50, 0xADD8E6, 0.5)
        this.recHoverRoom.setOrigin(0)
        this.recHoverRoom.setVisible(false)

        this.recSelectedRoom = this.add.rectangle(0, 0, 50, 50, 0x87CEFA, 0.4)
        this.recSelectedRoom.setOrigin(0)
        this.recSelectedRoom.setVisible(false)
        
        this.layerRoom!.setInteractive()
        this.layerRoom!.on('pointerdown', this.roomSelectHandler, this)
        this.layerRoom!.on('pointermove', this.roomHoverHanlder, this)
        this.layerRoom!.on('pointerout', () => {
            this.recHoverRoom.setVisible(false)
        })
    }

    roomSelectHandler(pointer : Phaser.Input.Pointer) {
        console.debug("Room select handler: ", pointer.worldX, ":", pointer.worldY)
        const tile = this.layerRoom!.getTileAtWorldXY(pointer.worldX, pointer.worldY)
  
        if (tile && tile != this.selectedTile) {
            console.debug("Room selected: ", tile.pixelX, ",", tile.pixelY)

            this.selectedTile = tile
            this.recSelectedRoom.setPosition(tile.pixelX, tile.pixelY)
            this.recSelectedRoom.setVisible(true)

            store.dispatch(tryJoinRoom(this.roomMap.get(this.getRoomKey(tile.x, tile.y))!))
        }
    }

    roomHoverHanlder(pointer : Phaser.Input.Pointer) {
        console.debug("Highlight Pointer:", pointer.worldX, ":", pointer.worldY)
        const tile = this.layerRoom!.getTileAtWorldXY(pointer.worldX, pointer.worldY)

        if (tile) {
            console.debug("Highlight Tile:", tile.pixelX, ":", tile.pixelY)
            
            if (tile !== this.selectedTile) {
                this.recHoverRoom.setPosition(tile.pixelX, tile.pixelY)
                this.recHoverRoom.setVisible(true)
            } else {
                this.recHoverRoom.setVisible(false)
            }
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

            this.roomMap.set(
                this.getRoomKey(room.roomX, room.roomY),
                room
            )
        }
    }

    getRoomKey(x : number, y : number) {
        return `${x}-${y}`
    }
}