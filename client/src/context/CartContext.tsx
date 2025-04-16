import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Cart } from "../Model/ICart"; // CartItem kullanılmıyor, silebilirsin

export interface ICartContext {
  cart: Cart | null;
  setCart: (cart: Cart) => void;
  deleteItem: (ProductID: number, Quantity: number) => void;
}

// Burada createContext'e bir varsayılan değer vermemiz gerekiyor
export const CartContext = createContext<ICartContext | undefined>(undefined);
export function useCartContext(){
    const context= useContext(CartContext);

    if(context === undefined)
    {
        throw new Error("no provider");
    }

    return context;
}

export function CartContextProvider({children}:PropsWithChildren<any>){
    const [cart, setCart] = useState<Cart | null>(null);

    function deleteItem(ProductID: number, Quantity: number) {
        
    }

    return(
        <CartContext.Provider value={{cart, setCart, deleteItem}}>
            {children}
        </CartContext.Provider>
    );
}