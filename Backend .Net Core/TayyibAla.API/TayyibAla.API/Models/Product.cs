using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TayyibAla.API.Models
{
    public class Product
    {
        public int id { get; set; }
        public string name { get; set; }
        public string content { get; set; }
        public string image { get; set; }
        public Decimal price { get; set; }
        public int status { get; set; }
    }
}
