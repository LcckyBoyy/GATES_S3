using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GATES.DA.Interface
{
    public interface IHelperDA
    {
        public bool CheckAccess(string userId, string inventoryId);
    }
}
