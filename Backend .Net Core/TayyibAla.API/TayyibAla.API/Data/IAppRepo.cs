using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TayyibAla.API.Dtos;
using TayyibAla.API.Models;

namespace TayyibAla.API.Data
{
    public interface IAppRepo
    {
        void Add<T>(T entity) where T:class;
        void Delete<T>(T entity) where T : class;
        bool SaveAll();

        List<Product> GetProducts();
        Product GetProductById(int id);
        Task<Order> AddOrder(Order order);
        List<Product> GetOrderedProductsByCustomerId(int customer_id);
        void DeleteOrderedProduct(int product_id, int customer_id);
    }
}
