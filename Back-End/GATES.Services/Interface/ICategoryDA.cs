using GATES.DA.ServicesModel;

namespace GATES.DA.Interface
{
    public interface ICategoryDA
    {
        public BaseResponse<bool> Insert(daInsertCategory req);
        public BaseResponse<List<daGetListCategory>> GetList(string inventoryId);
        public BaseResponse<daUpdateCategory> GetCategory(string categoryId, string inventoryId);
        public BaseResponse<bool> Set(daUpdateCategory req);
        public BaseResponse<bool> Remove(string categoryId);
    }
}
