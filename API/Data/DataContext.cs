using Microsoft.EntityFrameworkCore;
using API.Entity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore; // ✔️ DOĞRU!


namespace API.Data
{
    public class DataContext : IdentityDbContext<AppUser, AppRole, string>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Cart> Carts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>().HasData(
                new List<Product>
                {
                    new Product
                    {
                        ID = 1,
                        Name = "Iphone 15",
                        Description = "Telefon açıklaması",
                        ImageUrl = "./IMAGE/İPHONE15TEL.webp",
                        Price = 50000,
                        IsActive = true,
                        Stock = 350
                    }
                }
            );
        }
    }
}
