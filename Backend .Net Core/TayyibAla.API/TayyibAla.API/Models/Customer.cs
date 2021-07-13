using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TayyibAla.API.Models
{
    public class Customer
    {
        public int id { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string e_mail { get; set; }
        public Byte[] password_hash { get; set; }
        public Byte[] password_salt { get; set; }
        public Decimal money { get; set; }
    }
}
