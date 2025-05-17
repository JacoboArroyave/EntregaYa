// src/store/store.ts

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import userCustomer from "./CustomerSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        customer:userCustomer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
