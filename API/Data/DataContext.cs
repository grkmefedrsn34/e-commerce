using Microsoft.EntityFrameworkCore;
using API.Entity;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }

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
