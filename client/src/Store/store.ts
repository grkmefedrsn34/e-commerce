import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../Pages/counter/counterSlice";
import { cartSlice } from "../Pages/cart/CartSlice";
import { catalogSlice } from "../Pages/catalog/catalogSlice";
import { accountSlice } from "../Pages/account/accountSlice";

export const store = configureStore({
   reducer:{
    counter : counterSlice.reducer,
    cart : cartSlice.reducer,
    catalog:catalogSlice.reducer,
    account:accountSlice.reducer
   } 
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;