using API.Entity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
    public static class SeedDatabase
    {
        public static async Task Initialize(IApplicationBuilder app)
        {
            using var scope = app.ApplicationServices.CreateScope();
            var services = scope.ServiceProvider;

            var userManager = services.GetRequiredService<UserManager<AppUser>>();
            var roleManager = services.GetRequiredService<RoleManager<AppRole>>();

            // Roller ekleniyor
            if (!roleManager.Roles.Any())
            {
                var customerRole = new AppRole { Name = "Customer" };
                var adminRole = new AppRole { Name = "Admin" };

                await roleManager.CreateAsync(customerRole);
                await roleManager.CreateAsync(adminRole);
            }

            // Kullanýcýlar ekleniyor
            if (!userManager.Users.Any())
            {
                var customer = new AppUser
                {
                    Name = "Buse Uzun",
                    UserName = "buseuu_",
                    Email = "buseudersin@gmail.com"
                };

                var admin = new AppUser
                {
                    Name = "Görkem Efe Dersin",
                    UserName = "GED34",
                    Email = "görkemdersin@gmail.com"
                };

                var customerResult = await userManager.CreateAsync(customer, "Customer_123456");
                if (customerResult.Succeeded)
                {
                    await userManager.AddToRoleAsync(customer, "Customer");
                }

                var adminResult = await userManager.CreateAsync(admin, "Admin_123456");
                if (adminResult.Succeeded)
                {
                    await userManager.AddToRoleAsync(admin, "Admin");
                }
            }
        }
    }
}
