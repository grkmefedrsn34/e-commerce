using API.Entity;

namespace API.DTO
{
    public class OrderDTO
    {
        public int ID { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Phone { get; set; }
        public string? City { get; set; }
        public string? AddresLine { get; set; }
        public string? CustomerID { get; set; }
        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
        public List<OrderItemDTO>? OrderItems { get; set; } = new();
        public decimal SubTotal { get; set; }
        public decimal DeliveryFree { get; set; }

        public decimal GetTotal()
        {
            return SubTotal + DeliveryFree;
        }
    }

    public class OrderItemDTO
    {
        public int ID { get; set; }
        public string? OrderID { get; set; }
        public int ProductID { get; set; }
        public string ProductName { get; set; } = null!;
        public string ProductImage { get; set; } = null!;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}
