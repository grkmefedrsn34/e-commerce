import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../Model/ICart";
import request from "../../api/Request";

interface CartState {
    cart: Cart | null;
    status: string;
}

const initialState: CartState = {
    cart: null,
    status: "idle"
};

export const addItemToCart = createAsyncThunk<Cart, { ProductID: number; Quantity?: number }>(
    "cart/addItemToCart",
    async ({ ProductID, Quantity = 1 }) => {
        try {
            return await request.Cart.addItem(ProductID, Quantity);
        } catch (error) {
            console.log(error);
            throw error; // hata fırlatmazsan rejected tetiklenmez!
        }
    }
);

export const deleteItemFromCart = createAsyncThunk<Cart, { ProductID: number; Quantity?: number }>(
    "cart/deleteItemFromCart",
    async ({ ProductID, Quantity = 1 }) => {
        try {
            return await request.Cart.deleteItem(ProductID, Quantity);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
);

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
        }
    },
    extraReducers: (builder) => {
        // --- ADD ITEM TO CART ---
        builder.addCase(addItemToCart.pending, (state, action) => {
            state.status = "pendingAddItem" + action.meta.arg.ProductID;
        });
        builder.addCase(addItemToCart.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.status = "success";
        });
        builder.addCase(addItemToCart.rejected, (state) => {
            state.status = "idle";
        });

        // --- DELETE ITEM FROM CART ---
        builder.addCase(deleteItemFromCart.pending, (state, action) => {
            state.status = "pendingDeleteItem" + action.meta.arg.ProductID;
        });
        builder.addCase(deleteItemFromCart.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.status = "success";
        });
        builder.addCase(deleteItemFromCart.rejected, (state) => {
            state.status = "idle";
        });
    }
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
