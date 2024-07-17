using chatservice.Users;
using Microsoft.EntityFrameworkCore;

namespace chatservice.Context
{
    public partial class ChatContext : DbContext
    {
        public ChatContext()
        {
        }

        public ChatContext(DbContextOptions<ChatContext> options)
            : base(options)
        {
        }

        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(
                $"Server={Environment.GetEnvironmentVariable("SQLSERVER_HOST")};" +
                $"Database={Environment.GetEnvironmentVariable("SQLSERVER_DB")};" +
                $"User Id={Environment.GetEnvironmentVariable("SQLSERVER_USER")};" +
                $"Password={Environment.GetEnvironmentVariable("SQLSERVER_PASSWORD")};" +
                "Encrypt=False");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("user_pk");

                entity.ToTable("user");

                entity.HasIndex(e => e.Username, "user_pk_2").IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.HashedPassword)
                    .HasMaxLength(512)
                    .HasColumnName("hashedPassword");
                entity.Property(e => e.Username)
                    .HasMaxLength(20)
                    .HasColumnName("username");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
