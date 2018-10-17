using DattingApp.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace DattingApp.Api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
        : base(options)
        {
            
        }

        public DbSet<Value> Values { get; set; }
    }
}