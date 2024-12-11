using GATES.DA.ServicesModel;


namespace GATES.DA.Interface
{
	public interface ISupplierDA
	{
		public BaseResponse<bool> Insert(daInsertSupplier req);
		public BaseResponse<List<daGetListSupplier>> GetList(string inventoryId);
		public BaseResponse<bool> Remove(string supplierId);
	}
}
