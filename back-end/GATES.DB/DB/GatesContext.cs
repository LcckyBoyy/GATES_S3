using System;
using System.Collections.Generic;
using System.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Protocols;

namespace GATES.DA.DB;

public partial class GatesContext : DbContext
{
    public GatesContext()
    {
    }

    public GatesContext(DbContextOptions<GatesContext> options)
        : base(options)
    {
    }

    public virtual DbSet<MtCategory> MtCategories { get; set; }

    public virtual DbSet<MtSupplier> MtSuppliers { get; set; }

    public virtual DbSet<MtUser> MtUsers { get; set; }

    public virtual DbSet<PAuditLog> PAuditLogs { get; set; }

    public virtual DbSet<PInventory> PInventories { get; set; }

    public virtual DbSet<PInventoryAccess> PInventoryAccesses { get; set; }

    public virtual DbSet<PProduct> PProducts { get; set; }

    public virtual DbSet<PProductHistory> PProductHistories { get; set; }

    public virtual DbSet<PProductImage> PProductImages { get; set; }

    public virtual DbSet<PProductSupplier> PProductSuppliers { get; set; }

    public virtual DbSet<PStockMovement> PStockMovements { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(ConfigurationManager.ConnectionStrings["GATES"].ConnectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<MtCategory>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK_mtCategories");

            entity.ToTable("mtCategory");

            entity.Property(e => e.CategoryId)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("category_id");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("name");
        });

        modelBuilder.Entity<MtSupplier>(entity =>
        {
            entity.HasKey(e => e.SupplierId);

            entity.ToTable("mtSuppliers");

            entity.Property(e => e.SupplierId)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("supplier_id");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("address");
            entity.Property(e => e.ContactPerson)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("contact_person");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.IsActive).HasColumnName("is_active");
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("phone");
            entity.Property(e => e.SupplierName)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("supplier_name");
        });

        modelBuilder.Entity<MtUser>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK_mtUser");

            entity.ToTable("mtUsers");

            entity.Property(e => e.UserId)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("user_id");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.IsActive).HasColumnName("is_active");
            entity.Property(e => e.LastLogin)
                .HasColumnType("datetime")
                .HasColumnName("last_login");
            entity.Property(e => e.PasswordSalt)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("password_salt");
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("phone");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("username");
        });

        modelBuilder.Entity<PAuditLog>(entity =>
        {
            entity.HasKey(e => e.LogId);

            entity.ToTable("pAuditLogs");

            entity.Property(e => e.LogId)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("log_id");
            entity.Property(e => e.ActionTimestamp)
                .HasColumnType("datetime")
                .HasColumnName("action_timestamp");
            entity.Property(e => e.ActionType)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("action_type");
            entity.Property(e => e.IpAddress)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("ip_address");
            entity.Property(e => e.NewValues)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("new_values");
            entity.Property(e => e.OldValues)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("old_values");
            entity.Property(e => e.RecordId)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("record_id");
            entity.Property(e => e.TableName)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("table_name");
            entity.Property(e => e.UserId)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("user_id");

            entity.HasOne(d => d.Record).WithMany(p => p.PAuditLogs)
                .HasForeignKey(d => d.RecordId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_pAuditLogs_pStockMovements");

            entity.HasOne(d => d.User).WithMany(p => p.PAuditLogs)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_pAuditLogs_mtUsers");
        });

        modelBuilder.Entity<PInventory>(entity =>
        {
            entity.HasKey(e => e.InventoryId);

            entity.ToTable("pInventory");

            entity.Property(e => e.InventoryId)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("inventory_id");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("description");
            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("id");
            entity.Property(e => e.InventoryName)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("inventory_name");
            entity.Property(e => e.IsActive).HasColumnName("is_active");
            entity.Property(e => e.OwnerId)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("owner_id");

            entity.HasOne(d => d.Owner).WithMany(p => p.PInventories)
                .HasForeignKey(d => d.OwnerId)
                .HasConstraintName("FK_pInventory_mtUser");
        });

        modelBuilder.Entity<PInventoryAccess>(entity =>
        {
            entity.HasKey(e => e.InventoryAccesId);

            entity.ToTable("pInventoryAccess");

            entity.Property(e => e.InventoryAccesId)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("inventoryAcces_id");
            entity.Property(e => e.ExpiredAt)
                .HasColumnType("datetime")
                .HasColumnName("expired_at");
            entity.Property(e => e.GrantedAt)
                .HasColumnType("datetime")
                .HasColumnName("granted_at");
            entity.Property(e => e.InventoryId)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("inventory_id");
            entity.Property(e => e.IsActive).HasColumnName("is_active");
            entity.Property(e => e.UserId)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("user_id");

            entity.HasOne(d => d.Inventory).WithMany(p => p.PInventoryAccesses)
                .HasForeignKey(d => d.InventoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_pInventoryAccess_pInventory");

            entity.HasOne(d => d.User).WithMany(p => p.PInventoryAccesses)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_pInventoryAccess_mtUser");
        });

        modelBuilder.Entity<PProduct>(entity =>
        {
            entity.HasKey(e => e.ProductId);

            entity.ToTable("pProducts");

            entity.Property(e => e.ProductId)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("product_id");
            entity.Property(e => e.CategoryId)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("category_id");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.CurrentStock).HasColumnName("current_stock");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("description");
            entity.Property(e => e.InventoryId)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("inventory_id");
            entity.Property(e => e.IsActive).HasColumnName("is_active");
            entity.Property(e => e.MinimumStock).HasColumnName("minimum_stock");
            entity.Property(e => e.ProductName)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("product_name");
            entity.Property(e => e.Sku)
                .HasMaxLength(225)
                .IsUnicode(false)
                .HasColumnName("SKU");
            entity.Property(e => e.UnitMeasure)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("unit_measure");
            entity.Property(e => e.UnitPrice)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("unit_price");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Category).WithMany(p => p.PProducts)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK_pProducts_mtCategory");

            entity.HasOne(d => d.Inventory).WithMany(p => p.PProducts)
                .HasForeignKey(d => d.InventoryId)
                .HasConstraintName("FK_pProducts_pInventory");
        });

        modelBuilder.Entity<PProductHistory>(entity =>
        {
            entity.HasKey(e => e.HistoryId);

            entity.ToTable("pProductHistory");

            entity.Property(e => e.HistoryId)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("history_id");
            entity.Property(e => e.ChangedAt)
                .HasColumnType("datetime")
                .HasColumnName("changed_at");
            entity.Property(e => e.ChangedBy)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("changed_by");
            entity.Property(e => e.NewPrice)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("new_price");
            entity.Property(e => e.OldPrice)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("old_price");
            entity.Property(e => e.ProductId)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("product_id");

            entity.HasOne(d => d.Product).WithMany(p => p.PProductHistories)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK_pProductHistory_pProducts");
        });

        modelBuilder.Entity<PProductImage>(entity =>
        {
            entity.HasKey(e => e.ImageId);

            entity.ToTable("pProductImages");

            entity.Property(e => e.ImageId)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("image_id");
            entity.Property(e => e.ImageType)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("image_type");
            entity.Property(e => e.ImageUrl)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("image_url");
            entity.Property(e => e.IsPriamary).HasColumnName("is_priamary");
            entity.Property(e => e.ProductId)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("product_id");
            entity.Property(e => e.UplodedAt)
                .HasColumnType("datetime")
                .HasColumnName("uploded_at");

            entity.HasOne(d => d.Product).WithMany(p => p.PProductImages)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK_pProductImages_pProducts");
        });

        modelBuilder.Entity<PProductSupplier>(entity =>
        {
            entity.HasKey(e => e.ProductSuppliersId);

            entity.ToTable("pProductSuppliers");

            entity.Property(e => e.ProductSuppliersId)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("productSuppliers_id");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("address");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.IsActive).HasColumnName("is_active");
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("phone");
            entity.Property(e => e.ProductId)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("product_id");
            entity.Property(e => e.SupplierId)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("supplier_id");

            entity.HasOne(d => d.Product).WithMany(p => p.PProductSuppliers)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK_pProductSuppliers_pProducts");

            entity.HasOne(d => d.Supplier).WithMany(p => p.PProductSuppliers)
                .HasForeignKey(d => d.SupplierId)
                .HasConstraintName("FK_pProductSuppliers_mtSuppliers");
        });

        modelBuilder.Entity<PStockMovement>(entity =>
        {
            entity.HasKey(e => e.MovementId);

            entity.ToTable("pStockMovements");

            entity.Property(e => e.MovementId)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("movement_id");
            entity.Property(e => e.MovementDate)
                .HasColumnType("datetime")
                .HasColumnName("movement_date");
            entity.Property(e => e.MovementType)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("movement_type");
            entity.Property(e => e.Notes)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("notes");
            entity.Property(e => e.ProductId)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("product_id");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.ReferenceNo)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("reference_no");
            entity.Property(e => e.Status)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("status");

            entity.HasOne(d => d.Product).WithMany(p => p.PStockMovements)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK_pStockMovements_pProducts");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
