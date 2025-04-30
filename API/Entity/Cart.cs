namespace API.Entity
{
    public class Cart
    {
        public int CartID { get; set; }

        // NOT: Eðer cookie'den gelen müþteri bilgisi string ise bunu string yapmalýsýn
        public string CustomerID { get; set; } = string.Empty;

        public List<CartItem> CartItems { get; set; } = new();

        public void AddItem(Product product, int quantity)
        {
            var item = CartItems.FirstOrDefault(c => c.ProductID == product.ID);

            if (item == null)
            {
                CartItems.Add(new CartItem { Product = product, Quantity = quantity });
            }
            else
            {
                item.Quantity += quantity;
            }
        }

        public void DeleteItem(int productId, int quantity)
        {
            var item = CartItems.FirstOrDefault(c => c.ProductID == productId);
            if (item == null) return;

            item.Quantity -= quantity;

            if (item.Quantity <= 0)
            {
                CartItems.Remove(item);
            }
        }

        public double CalculateTotal()
        {
            return (double)CartItems.Sum(c => c.Product.Price * c.Quantity);
        }
    }

    public class CartItem
    {
        public int CartItemID { get; set; }
        public int ProductID { get; set; }
        public Product Product { get; set; } = null!;
        public int CartID { get; set; }
        public Cart Cart { get; set; } = null!;
        public int Quantity { get; set; }
    }
}
