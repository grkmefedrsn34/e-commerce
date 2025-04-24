import { useEffect } from "react";
import ProductList from "./ProductList";

import { fetchProducts, selectAllProduct } from "./catalogSlice";
import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../Store/store";

export default function CatalogPage() {
    const products = useAppSelector(selectAllProduct);
    const { status ,isLoaded} = useAppSelector((state) => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(!isLoaded)
        dispatch(fetchProducts()); // thunk fonksiyonu çağırıldı
    }, [isLoaded]);

    if (status === 'loading') return <CircularProgress />;

    return (
        <ProductList 
            products={products}
            addProduct={() => { console.log("Ürün eklendi"); }} // gerekli prop eklendi
        />
    );
}
