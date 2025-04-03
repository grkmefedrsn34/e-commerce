import { useEffect, useState } from "react";
import { IProduct } from "../../Model/IProduct";
import ProductList from "./ProductList";
import request from "../../api/Request";

export default function CatalogPage() {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        request.catalog.list()
            .then(data => setProducts(data));
    }, []);

    function addProduct() {
        setProducts([...products, { id: Date.now(), name: "product 1907", price: 1907000, isActive: true, stock: 200 }]);
    }

    return <ProductList products={products} addProduct={addProduct} />;
}
console.log('CatalogPage component rendered');
console.log('Products:');
console.log('Adding new product to catalog');