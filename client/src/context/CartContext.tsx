import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Cart } from "../Model/ICart";

export interface ICartContext {
  cart: Cart | null;
  setCart: (cart: Cart) => void;
  deleteItem: (ProductID: number, Quantity: number) => void;
}

export const CartContext = createContext<ICartContext | undefined>(undefined);

export function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("CartContext must be used within a CartContextProvider");
  }
  return context;
}

export function CartContextProvider({ children }: PropsWithChildren<{}>) {
  const [cart, setCart] = useState<Cart | null>(null);

  function deleteItem(ProductID: number, Quantity: number) {
    // TODO: Ürün silme işlemi eklenecek
    void ProductID;
    void Quantity;
  }

  return (
    <CartContext.Provider value={{ cart, setCart, deleteItem }}>
      {children}
    </CartContext.Provider>
  );
}
export default CartContext;