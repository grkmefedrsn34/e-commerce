namespace API.DTO
{
    public class CreateOrderDTO
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Phone { get; set; }
        public string? City { get; set; }
        public string? AddresLine { get; set; }

        public string? CartName { get; set; }
        public string? CartNumber { get; set; }
        public string? CartExpirationMonth { get; set; }
        public string? CartExpirationYear { get; set; }
        public string? CartCVC { get; set; }
    }
}
