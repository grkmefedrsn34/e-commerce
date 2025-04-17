using Microsoft.AspNetCore.Identity;

namespace API.Entity
{
    public class AppUser : IdentityUser
    {
        // Ek kullanıcı bilgileri
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? Country { get; set; }
        public string? ZipCode { get; set; }
        public DateTime DateOfBirth { get; set; } = DateTime.UtcNow;
        public string? ImageUrl { get; set; }

        // Aktiflik durumu
        public bool IsActive { get; set; } = true;
    }
}
public class AppUser : IdentityUser
{
    internal string Name;

    // Ek kullanıcı bilgileri
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string ZipCode { get; set; } = string.Empty;
    public DateTime DateOfBirth { get; set; } = DateTime.UtcNow;
    public string ImageUrl { get; set; } = string.Empty;

    // Aktiflik durumu
    public bool IsActive { get; set; } = true;
}