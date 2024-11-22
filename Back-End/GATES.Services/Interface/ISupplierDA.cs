using GATES.DA.ServicesModel;


namespace GATES.DA.Interface
{
	public interface ISupplierDA
	{
		public BaseResponse<bool> Insert(daInsertSupplier req);
	}
}
