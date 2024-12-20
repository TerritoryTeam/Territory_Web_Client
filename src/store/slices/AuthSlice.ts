import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    isLoginIn : boolean;
}

const initialState: AuthState = {
    isLoginIn: false
}

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state) => {
            state.isLoginIn = true;
        },
        logout: (state) => {
            state.isLoginIn = false;
        }
    }
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;