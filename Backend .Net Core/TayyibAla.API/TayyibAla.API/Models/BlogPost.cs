using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TayyibAla.API.Models
{
    public class BlogPost
    {
        public int id { get; set; }
        public string title { get; set; }
        public string content { get; set; }
        public string image { get; set; }
        public DateTime created_at { get; set; }
        public DateTime ? updated_at { get; set; }
        public int status { get; set; }
    }
}
