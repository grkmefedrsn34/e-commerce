import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../Model/IProduct";
import request from "../../api/Request";
import { RootState } from "../../Store/store";

// Ürünleri listeleme thunk'ı
export const fetchProducts = createAsyncThunk<IProduct[]>(
    "catalog/fetchProducts",
    async () => {
        return await request.catalog.list();
    }
);

// Belirli bir ürünü ID ile getiren thunk (farklı action type ile)
export const fetchProductByID = createAsyncThunk<IProduct, number>(
    "catalog/fetchProductByID", // ✅ benzersiz action type
    async (ProductID) => {
        return await request.catalog.details(ProductID);
    }
);

// Entity adapter
const productAdapter = createEntityAdapter<IProduct>();

// Başlangıç durumu
const initialState = productAdapter.getInitialState({
    status: 'idle',
    isLoaded: false
});

// Slice tanımı
export const catalogSlice = createSlice({
    name: "catalog",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            productAdapter.setAll(state, action.payload);
            state.isLoaded = true;
            state.status = 'succeeded';
        });
        builder.addCase(fetchProducts.rejected, (state) => {
            state.status = "idle";
        });

        builder.addCase(fetchProductByID.fulfilled, (state, action) => {
            productAdapter.upsertOne(state, action.payload);
            state.status = "idle";
        });
        builder.addCase(fetchProductByID.rejected, (state) => {
            state.status = "idle";
        });
    }
});

// Selectors
export const {
    selectById: selectProductByID,
    selectIds: selectProductIds,
    selectAll: selectAllProduct,
    selectTotal: selectTotalProduct,
} = productAdapter.getSelectors((state: RootState) => state.catalog);
export default catalogSlice.reducer;