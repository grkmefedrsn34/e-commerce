export interface CartItem {
    imageUrl: string;
    name: string;
    price: number;
    ProductID: number;  // ✅ düzeltilmiş
    Quantity: number;
  }
  
  export interface Cart {
    CartID: number;      // ✅ düzeltilmiş
    CustomerID: string;  // ✅ düzeltilmiş
    CartItems: CartItem[];
  }
  