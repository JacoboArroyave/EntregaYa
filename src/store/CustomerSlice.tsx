// src/store/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Customer } from "../models/Customer";

interface CustomerState {
    customer: Customer | null;
}

const storedCustomer = localStorage.getItem("customer");
const initialState: CustomerState = {
    customer: storedCustomer ? JSON.parse(storedCustomer) : null,
};

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        setCustomer: (state, action: PayloadAction<Customer | null>) => {
            state.customer = action.payload;
            if (action.payload) {
                localStorage.setItem("customer", JSON.stringify(action.payload));
            } else {
                localStorage.removeItem("customer");
            }
        },
    },
});

export const { setCustomer } = customerSlice.actions;
export default customerSlice.reducer;