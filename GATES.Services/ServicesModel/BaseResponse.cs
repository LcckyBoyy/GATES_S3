using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GATES.DA.ServicesModel
{
    public class BaseResponse<T>
    {
        public T? Result { get; set; }
        public string? Message { get; set; }
    }
}
