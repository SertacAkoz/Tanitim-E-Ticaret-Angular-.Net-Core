using TayyibAla.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TayyibAla.API.Data
{
    public interface IAuthRepo
    {
        Task<Customer> Register(Customer user, string password);
        Task<Customer> Login(string e_mail, string password);
        Task<bool> UserExists(string e_mail);
        Task<Customer> GetCurrentCustomer(string e_mail);
    }
}
