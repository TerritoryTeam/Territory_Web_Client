import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from "./slices/AuthSlice";
import UserReducer from "./slices/UserSlice";


const store = configureStore({
    reducer: {
        auth: AuthReducer,
        user: UserReducer,
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;