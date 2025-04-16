using API.Entity;

namespace API.DTO
{
    public class CartDTO
    {
        public int CartID { get; set; }
        public string? CustomerID { get; set; }
        public List<CartItemDTO> CartItems { get; set; } = new();
    }
       
    public class CartItemDTO
    {
            public int CartItemID { get; set; }
            public int ProductID { get; set; }
            public string? Name { get; set; }
            public decimal Price { get; set; }
            public string? ImageUrl { get; set; }
            public int Quantity { get; set; }
    }
}
