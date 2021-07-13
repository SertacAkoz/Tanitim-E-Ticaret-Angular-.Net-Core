using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TayyibAla.API.Dtos
{
    public class OrderForAdd
    {
        public int customer_id { get; set; }
        public int product_id { get; set; }
    }
}
