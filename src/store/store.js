import { configureStore } from "@reduxjs/toolkit";
import transactionSlice from "./transactionSlice";
export const store = configureStore({
    reducer: {
        transaction: transactionSlice,
    }
})