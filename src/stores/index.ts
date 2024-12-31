import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from "./slices/AuthSlice";
import UserReducer from "./slices/UserSlice";
import WorldReducer from "./slices/WorldSlice";

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        user: UserReducer,
        world: WorldReducer,
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
