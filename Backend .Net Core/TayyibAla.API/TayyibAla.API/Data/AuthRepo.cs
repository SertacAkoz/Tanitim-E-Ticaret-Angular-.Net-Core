using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TayyibAla.API.Data;
using TayyibAla.API.Models;

namespace TayyibAla.API.Data
{
    public class AuthRepo : IAuthRepo
    {
        private DataContext _context;

        public AuthRepo(DataContext context)
        {
            _context = context;
        }

        public async Task<Customer> Login(string e_mail, string password)
        {
            var customer = await _context.customers.FirstOrDefaultAsync(x => x.e_mail == e_mail);

            if (customer == null)
            {
                return null;
            }

            using (var hmac = new System.Security.Cryptography.HMACSHA512(customer.password_salt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != customer.password_hash[i])
                    {
                        return null;
                    }
                }
                return customer;
            }

            
        }

        private bool VerifyPasswordHash(string password, byte[] password_hash, byte[] password_salt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512(password_salt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != password_hash[i])
                    {
                        return false;
                    }
                }
                return true;
            }
        }

        public async Task<Customer> Register(Customer customer, string password)
        {
            byte[] password_hash, password_salt;

            CreatePasswordHash(password, out password_hash, out password_salt);

            customer.password_hash = password_hash;
            customer.password_salt = password_salt;

            await _context.customers.AddAsync(customer);
            await _context.SaveChangesAsync();

            return customer;
        }

        private void CreatePasswordHash(string password, out byte[] password_hash, out byte[] password_salt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                password_salt = hmac.Key;
                password_hash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string e_mail)
        {
            if (await _context.customers.AnyAsync(x=>x.e_mail == e_mail))
            {
                return true;
            }
            return false;
        }

        public async Task<Customer> GetCurrentCustomer(string e_mail)
        {
            var customer = await _context.customers.FirstOrDefaultAsync(x => x.e_mail == e_mail);

            if (customer == null)
            {
                return null;
            }
            return customer;
        }
    }
}
