import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { globalContainer } from "../../providers/GlobalProvider";

import { 
    clearUserInformation,
    fetchUserInformation
} from "./UserSlice";

interface AuthState {
    isLoginIn: boolean;
    loginStatus: 'idle' | 'loading' | 'failed' | 'success';
    error: string | null;
}

interface LoginWithEmailCredential {
    email: string;
    password: string;
}

const initialState: AuthState = {
    isLoginIn: false,
    loginStatus: 'idle',
    error: null
}


export const loginWithEmailCredential = createAsyncThunk<boolean, LoginWithEmailCredential, { rejectValue: string }>(
    'auth/login',
    async ({ email, password }, thunkAPI) => {
      try {
        const session = await globalContainer.nakama.authenticateEmail(email, password);
        if (session != null) {
            thunkAPI.dispatch(fetchUserInformation());
            
            return true;
        } else {
          return thunkAPI.rejectWithValue("Invalid Authentication"); 
        }
      } catch (error) {
        return thunkAPI.rejectWithValue('Network error');
      }
    }
  );

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state, action) => {
            state.isLoginIn = false;
            state.loginStatus = 'idle';
            
            state.error = null;
            // Dispatch clearUserInformation action
            action.payload.dispatch(clearUserInformation());
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginWithEmailCredential.pending, (state) => {
                state.loginStatus = 'loading';
            })
            .addCase(loginWithEmailCredential.fulfilled, (state, action) => {
                state.isLoginIn = action.payload;
                state.loginStatus = 'success';
            })
            .addCase(loginWithEmailCredential.rejected, (state, action) => {   
                state.error = action.payload as string;
                state.loginStatus = 'failed';
            });
    }
});

export const { 
    logout 
} = AuthSlice.actions;
export default AuthSlice.reducer;