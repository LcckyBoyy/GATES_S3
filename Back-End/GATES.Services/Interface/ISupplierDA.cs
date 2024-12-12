using GATES.DA.ServicesModel;


namespace GATES.DA.Interface
{
	public interface ISupplierDA
	{
		public BaseResponse<bool> Insert(daInsertSupplier req);
		public BaseResponse<List<daGetListSupplier>> GetList(string inventoryId);
		public BaseResponse<daUpdateSupplier> GetSupplier(string inventoryId, string supplierId);
        public BaseResponse<bool> Set(daUpdateSupplier req);
        public BaseResponse<bool> Remove(string supplierId);
	}
}
