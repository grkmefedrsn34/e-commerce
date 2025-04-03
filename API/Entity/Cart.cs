namespace API.Entity
{
    public class Cart
    {
        public int CartID {get;set;}
        public int CustomerID {get;set;}
        public List<CartItem> CartItems {get;set;} = new();
    }

    public class CartItem
    {
        public int CartItemID {get;set;}
        public int ProductID {get;set;}
        public Product Product {get;set;} = null!;
        public int CartID {get;set;}
        public Cart Cart {get;set;} = null!;
        public int Quantity {get;set;}

    }
}