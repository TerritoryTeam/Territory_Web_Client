import {
    createAsyncThunk,
    createSlice,
    PayloadAction, 
} from "@reduxjs/toolkit";

import { globalContainer } from "../../providers/GlobalProvider";

import { World } from "../../models/worlds";
import { Room } from "../../territory";

export const joinGameWorld = createAsyncThunk<World, World, { rejectValue: string }>(
    'game/world/join',
    async (world, thunkAPI) => {
      try {
        if (world == null || world.match_id == null) {
          return thunkAPI.rejectWithValue("Invalid Operation");
        }

        await globalContainer.nakama.joinWorld(world?.match_id);

        return world
      } catch (error) {
        return thunkAPI.rejectWithValue('Network error');
      }
    }
  );

const WorldSlice = createSlice({
    name: "world",
    initialState: {
        lobbyJoined: false,
        worldJoined: false,
        worldId: '',
        worldHistory: [] as World[],
        roomJoined: false,
        roomId: '',
        worldRooms: [] as Room[]
    },
    reducers: {
        setLobbyJoined: (state, action: PayloadAction<boolean>) => {
            state.lobbyJoined = action.payload
        },
        setWorldJoined: (state, action: PayloadAction<string>) => {
            state.worldJoined = true
            state.worldId = action.payload
        },
        setWorldRooms: (state, action: PayloadAction<Room[]>) => {
            state.worldRooms = action.payload
        },
        setRoomJoined: (state, action: PayloadAction<string>) => {
            state.roomJoined = true
            state.roomId = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(joinGameWorld.fulfilled, (state, action) => {
            state.worldJoined = true;
            state.worldId = action.payload.match_id;
            state.worldHistory.push(action.payload as World);
        });
        builder.addCase(joinGameWorld.rejected, (state, action) => {
            state.worldJoined = false;
            state.worldId = '';
            state.worldHistory = [];
            console.error(action.payload);
        });
    }
});

export const {
    setLobbyJoined,
    setWorldJoined,
    setWorldRooms,
    setRoomJoined,
} = WorldSlice.actions;
export default WorldSlice.reducer;

