import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../Model/IProduct";
import request from "../../api/Request";
import { RootState } from "../../Store/store";

export const fetchProducts = createAsyncThunk<IProduct[]>(
    "catalog/fetchProducts",
    async () =>{
            return await request.catalog.list();
    }
)

export const fetchProductByID = createAsyncThunk<IProduct,number>(
    "catalog/fetchProducts",
    async (ProductID) =>{
            return await request.catalog.details(ProductID);
    }
)
const productAdapter = createEntityAdapter<IProduct>();
const initialState = productAdapter.getInitialState({
    status: 'idle',
    isLoaded:false
})

export const catalogSlice = createSlice({
    name:"catalog",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            productAdapter.setAll(state,action.payload);
            state.isLoaded = true;
            state.status = 'succeeded';
        });
        builder.addCase(fetchProducts.rejected, (state) => {
            state.status ="idle"
        });
        builder.addCase(fetchProductByID.fulfilled,(state,action)=>{
            productAdapter.upsertOne(state,action.payload);
            state.status="idle";
        });
        builder.addCase(fetchProductByID.rejected,(state)=>{
            state.status="idle";
        })
    }
})

export const {
    selectById : selectProductByID,
    selectIds : selectProductIds,
    selectAll: selectAllProduct,
    selectTotal: selectTotalProduct,
} = productAdapter.getSelectors((state:RootState) => state.catalog)