import { useEffect } from "react";
import ProductList from "./ProductList";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { fetchProducts, selectAllProduct } from "./catalogSlice";
import { CircularProgress } from "@mui/material";

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
