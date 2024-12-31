import { 
    createSlice, 
    PayloadAction 
} from "@reduxjs/toolkit";


export interface GameWorld {
    Id: string;
    Name: string;
}

export interface Faction {
    Id: string;
    Name: string;
}

interface WorldState {
    isSelectedWorld: boolean;
    World: GameWorld | null;
    Faction: Faction | null;
}

const initialState: WorldState = {
    isSelectedWorld: false,
    World: null,
    Faction: null,
}

const WorldSlice = createSlice({
    name: "world",
    initialState,
    reducers: {
        selectWorld: (state, action: PayloadAction<{ world: GameWorld, faction: Faction }>) => {
            state.isSelectedWorld = true;
            state.World = action.payload.world;
            state.Faction = action.payload.faction;
        },
        unselectWorld: (state) => {
            state.isSelectedWorld = false;
            state.World = null;
            state.Faction = null;
        }
    }
});

export const { 
    selectWorld,
    unselectWorld } = WorldSlice.actions;
export default WorldSlice.reducer;

