import { Scene } from "phaser";
import store from "../../stores";
import { Room } from "../../territory";

export class RoomSelectorScene extends Scene
{
    map: Phaser.Tilemaps.Tilemap;
    layer1: Phaser.Tilemaps.TilemapLayer | null;
    layer2: Phaser.Tilemaps.TilemapLayer | null;

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

        this.layer1 = this.map.createBlankLayer('rooms', roomTiles!, 0, 0)
        this.layer2 = this.map.createBlankLayer('owners', logoTiles!, 0, 0)

        store.subscribe(() => this.updateRooms())
        this.updateRooms()

        this.input.on('pointermove', this.handlePointerMove, this);
    }

    updateRooms() {
        const state = store.getState()
        
        if (!state.world.worldRooms.length) return

        for (const room of state.world.worldRooms) {
            this.layer1?.putTileAt(1, room.roomX, room.roomY)

            const randomIndex = Phaser.Math.Between(0, 5);
            this.layer2?.putTileAt(randomIndex, room.roomX, room.roomY);
        }
    }

    handlePointerMove(pointer: Phaser.Input.Pointer): void {
        const worldX: number = pointer.x;
        const worldY: number = pointer.y;
      
        const tileX: number = this.map.worldToTileX(worldX)!;
        const tileY: number = this.map.worldToTileY(worldY)!;
      
        const tile: Phaser.Tilemaps.Tile | null = this.layer1!.getTileAt(tileX, tileY);
      
        if (tile) {
          console.log(`Hovering over tile at (${tileX}, ${tileY})`);
        }
    }
}