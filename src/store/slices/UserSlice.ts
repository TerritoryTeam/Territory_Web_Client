import { 
    createAsyncThunk, 
    createSlice 
} from "@reduxjs/toolkit";
import { globalContainer } from "../../providers/GlobalProvider";


interface UserState {
    username: string;
    email: string;
    avatarUrl: string;
    nickName: string;
    status: 'idle' | 'loading' | 'failed' | 'success';
}


const initialState: UserState = {
    username: "",
    email: "",
    avatarUrl: "",
    nickName: "",
    status: 'idle'
}

export const fetchUserInformation = createAsyncThunk<UserState, void, { rejectValue: string }>(
    'account/user',
    async (_, thunkAPI) => {
      try {
        const account = await globalContainer.nakama.fetchUserInfo();
        if (account != null && account.user != null) {
            return {
                username: account.user.username || "",
                email: account.email || "",
                avatarUrl: account.user.avatar_url || "",
                nickName: account.user.display_name || "",
                status: 'success'
            };
        } else {
          return thunkAPI.rejectWithValue("Invalid Authentication"); 
        }
      } catch (error) {
        return thunkAPI.rejectWithValue('Network error');
      }
    }
  );

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearUserInformation: (state) => {
            state.username = "";
            state.email = "";
            state.avatarUrl = "";
            state.nickName = "";
            state.status = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInformation.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserInformation.fulfilled, (state, action) => {
                state.username = action.payload.username;
                state.email = action.payload.email;
                state.avatarUrl = action.payload.avatarUrl;
                state.nickName = action.payload.nickName;

                state.status = 'success';
            })
        }
});

export const { 
    clearUserInformation 
} = UserSlice.actions;
export default UserSlice.reducer;