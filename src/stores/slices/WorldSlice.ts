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

        let joinedWorld = await globalContainer.nakama.joinWorld(world?.match_id);
        if (joinedWorld == null || joinedWorld.match_id == "") 
        {
            return thunkAPI.rejectWithValue("World not found");
        }

        return joinedWorld
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
        worldError: '',
        worldHistory: [] as World[],
        roomJoined: false,
        roomId: '',
        room: null as (Room | null),
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
        tryJoinRoom: (state, action: PayloadAction<Room>) => {
            state.room = action.payload
            state.roomId = `E${action.payload.roomX}S${action.payload.roomY}`
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
            state.worldError = '';
        });
        builder.addCase(joinGameWorld.rejected, (state, action) => {
            state.worldJoined = false;
            state.worldId = '';
            state.worldHistory = [];
            state.worldError = action.payload as string;
        });
    }
});

export const {
    setLobbyJoined,
    setWorldJoined,
    setWorldRooms,
    setRoomJoined,
    tryJoinRoom,
} = WorldSlice.actions;
export default WorldSlice.reducer;

