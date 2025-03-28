import { useEffect, useState } from "react";
import { IProduct } from "../../Model/IProduct";
import ProductList from "./ProductList";

export default function CatalogPage(){
    const [products,SetProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(false);  

    useEffect(()=>{
      fetch("http://localhost:5286/api/products").then(response => response.json()).then(data => SetProducts(data)).finally(()=>setLoading(false));
    },[]);
    
  
    function addProduct(){
      SetProducts([...products,{id:Date.now(),name:"product 1907",price:1907000,isActive:true,stock:200}])
    }
    return(
        <ProductList products={products} addProduct={addProduct} />
    );
}