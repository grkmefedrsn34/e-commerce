import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../Model/ICart";
import request from "../../api/Request";
import { AxiosError } from "axios";

interface CartState {
    cart: Cart | null;
    status: string;
}

const initialState: CartState = {
    cart: null,
    status: "idle"
};

// ÜRÜN EKLEME
export const addItemToCart = createAsyncThunk<Cart, { ProductID: number; Quantity?: number }>(
    "cart/addItemToCart",
    async ({ ProductID, Quantity = 1 }) => {
        try {
            return await request.Cart.addItem(ProductID, Quantity);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
);

// ÜRÜN SİLME
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

// SEPETİ GETİRME
export const getCart = createAsyncThunk<Cart>(
    "cart/getCart",
    async (_, thunkAPI) => {
        try {
            return await request.Cart.get();
        } catch (error) {
            const err = error as AxiosError;
            return thunkAPI.rejectWithValue({ error: err.response?.data });
        }
    }
);

// SLICELAR
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        clearCart: (state) => {
            state.cart = null;
        }
    },
    extraReducers: (builder) => {
        // ADD ITEM
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

        // DELETE ITEM
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

        // GET CART
        builder.addCase(getCart.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.status = "success";
        });
        builder.addCase(getCart.rejected, (_, action) => {
            console.log(action.payload);
        });
    }
});

export const { setCart,clearCart } = cartSlice.actions;
export default cartSlice.reducer;
