using GATES.DA.Interface;
using GATES.DB.DB;

namespace GATES.DA
{
    public class HelperDA : IHelperDA
    {
        public bool CheckAccess(string userId, string inventoryId)
        {
            using (GatesContext server = new GatesContext())
            {
                var db = server.PInventoryAccesses
                    .Where(i => i.UserId == userId 
                    && i.InventoryId == inventoryId
                ).FirstOrDefault();

                if (db == null) return false;
                else return true;
            }
        }

        public static readonly string MOVEMENT_TYPE_IN = "IN";
        public static readonly string MOVEMENT_TYPE_OUT = "OUT";
    }
}
