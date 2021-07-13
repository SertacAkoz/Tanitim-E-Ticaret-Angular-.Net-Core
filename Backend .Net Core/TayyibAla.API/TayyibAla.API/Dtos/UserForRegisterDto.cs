using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TayyibAla.API.Dtos
{
    public class UserForRegisterDto
    {
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string e_mail { get; set; }
        public string password { get; set; }

    }
}
