using API.DTO;
using API.Entity;

namespace API.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDTO> OrderToDTO(this IQueryable<Order> query)
        {
            return query.Select(x => new OrderDTO
            {
                ID = x.ID,
                OrderDate = x.OrderDate,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Phone = x.Phone,
                City = x.City,
                AddresLine = x.AddresLine,
                CustomerID = x.CustomerID,
                OrderStatus = x.OrderStatus,
                SubTotal = x.SubTotal,
                DeliveryFree = x.DeliveryFree,
                OrderItems = x.OrderItems.Select(i => new OrderItemDTO
                {
                    ID = i.ID,
                    OrderID = i.OrderID.ToString(),
                    ProductID = i.ProductID,
                    ProductName = i.Product.Name,
                    ProductImage = i.Product.ImageUrl,
                    Price = i.Price,
                    Quantity = i.Quantity
                }).ToList()
            });
        }
    }
}
