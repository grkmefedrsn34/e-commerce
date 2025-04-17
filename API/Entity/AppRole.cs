
using Microsoft.AspNetCore.Identity;

namespace API.Entity
{
    public class AppRole : IdentityRole
    {
        public string? DisplayName { get; set; } // 'name' yerine çakışma olmaması için değiştirildi
        public string? Description { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
