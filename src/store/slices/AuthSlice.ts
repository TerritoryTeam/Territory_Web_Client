import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { globalContainer } from "../../providers/GlobalProvider";


interface User {
    id: string;
    username: string;
    email: string;
}

interface AuthState {
    user: User | null;
    loginStatus: 'idle' | 'loading' | 'failed' | 'success';
    error: string | null;
}

interface LoginWithEmailCredential {
    email: string;
    password: string;
}

const initialState: AuthState = {
    user: null,
    loginStatus: 'idle',
    error: null
}


export const loginWithEmailCredential = createAsyncThunk<User, LoginWithEmailCredential, { rejectValue: string }>(
    'auth/login',
    async ({ email, password }, thunkAPI) => {
      try {
        const session = await globalContainer.nakama.authenticateEmail(email, password);
        if (session != null) {
            return {
                id: session.user_id || '',
                username: session.username || '',
                email: email
            } as User;
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
        logout: (state) => {
            state.user = null;
            state.loginStatus = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginWithEmailCredential.pending, (state) => {
                state.loginStatus = 'loading';
            })
            .addCase(loginWithEmailCredential.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loginStatus = 'success';
            })
            .addCase(loginWithEmailCredential.rejected, (state, action) => {   
                state.error = action.payload as string;
                state.loginStatus = 'failed';
            });
    }
});

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;