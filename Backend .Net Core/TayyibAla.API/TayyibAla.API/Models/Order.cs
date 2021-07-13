using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TayyibAla.API.Models
{
    public class Order
    {
        public int id { get; set; }
        public int customer_id { get; set; }
        public int product_id { get; set; }
        public int status { get; set; }
    }
}
