namespace API.Entity
{
    public class Cart
    {
        public int CartID {get;set;}
        public int CustomerID {get;set;}
        public List<CartItem> CartItems {get;set;} = new();
        public void AddItem(Product Product, int Quantity)
        {
            var item = CartItem.Where(c => c.ProductID == Product.ID).FirstOrDefault();

            if(item == null)
            {
                CartItem.Add(new CartItem {Product = Product , Quantity = Quantity });
            }
            else{
                item.Quantity += Quantity
            }
        }
        public void DeleteItem(int ProductID , int Quantity)
        {
            var item = CartItem.Where(c => c.ProductID == Product.ID).FirstOrDefault();
            if(item == null) return;
            item.Quantity -= Quantity;

            if(item.Quantity == 0)
            {
                CartItem.Remove(item);
            }
        }
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