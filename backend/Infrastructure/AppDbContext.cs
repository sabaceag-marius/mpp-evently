using Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure;

public class AppDbContext : DbContext
//public class AppDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
{
    public DbSet<Event> Events { get; set; }
    //public DbSet<Category> Categories { get; set; }

    //protected override void OnModelCreating(ModelBuilder builder)
    //{
    //    base.OnModelCreating(builder);

    //    List<IdentityRole> roles = new()
    //    {
    //        new IdentityRole
    //        {
    //            Name = "Admin",
    //            NormalizedName = "ADMIN"
    //        },
    //        new IdentityRole
    //        {
    //            Name = "User",
    //            NormalizedName = "USER"
    //        }
    //    };

    //    builder.Entity<IdentityRole>().HasData(roles);

    //}

    public AppDbContext(DbContextOptions<AppDbContext> context) : base(context)
    {
    }
}
