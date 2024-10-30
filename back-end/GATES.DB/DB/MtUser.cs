namespace GATES.DA.DB;

public partial class MtUser
{
    public string UserId { get; set; } = null!;

    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PasswordSalt { get; set; } = null!;

    public string? Phone { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime LastLogin { get; set; }

    public bool IsActive { get; set; }

    public virtual ICollection<PAuditLog> PAuditLogs { get; set; } = new List<PAuditLog>();

    public virtual ICollection<PInventory> PInventories { get; set; } = new List<PInventory>();

    public virtual ICollection<PInventoryAccess> PInventoryAccesses { get; set; } = new List<PInventoryAccess>();
}
