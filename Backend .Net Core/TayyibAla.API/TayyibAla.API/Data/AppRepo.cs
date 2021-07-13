using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TayyibAla.API.Dtos;
using TayyibAla.API.Models;

namespace TayyibAla.API.Data
{
    public class AppRepo : IAppRepo
    {
        private DataContext _context;

        public AppRepo(DataContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public async Task<Order> AddOrder(Order order)
        {
            await _context.orders.AddAsync(order);
            await _context.SaveChangesAsync();

            return order;

        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public Product GetProductById(int id)
        {
            var product = _context.products.FirstOrDefault(c => c.id == id);

            return product;
        }

        public List<Product> GetProducts()
        {
            var products = _context.products.Where(p=>p.status == 1).ToList();
            

            return products;
        }

        public bool SaveAll()
        {
            return _context.SaveChanges() > 0;
        }

        public List<Product> GetOrderedProductsByCustomerId(int customer_id)
        {
            //var productIds = await _context.orders.FromSql($"SELECT product_id FROM orders WHERE customer_id = '{customer_id}'").ToList();
            //var products = new List<Product>();
            //var productIds = await _context.orders.Where(p => p.customer_id == customer_id).Select(p => p.product_id).ToListAsync();
            //foreach (var item in productIds)
            //{
            //    var empty = _context.products.Where(p => p.id == item);
            //    products.Add(empty);
            //}

            //yedek
            //var orderedProducts = _context.products.FromSql($"SELECT p.* FROM orders AS o LEFT JOIN products AS p ON p.id = o.product_id WHERE o.customer_id = {customer_id} AND p.status = 1").ToList();
            var orderedProducts = _context.products.FromSql($"SELECT o.id,p.image,p.name,p.price,p.content,p.status FROM orders AS o LEFT JOIN products AS p ON p.id = o.product_id WHERE o.customer_id = {customer_id} AND p.status = 1").ToList();
            return orderedProducts;
        }

        public void DeleteOrderedProduct(int product_id, int customer_id)
        {
            //var deleted = _context.orders.FromSql($"SELECT o.* FROM orders AS o LEFT JOIN products AS p ON o.product_id= p.id WHERE o.customer_id = {customer_id} and o.product_id={product_id}");

            //var deleted = _context.orders.FromSql($"DELETE o.*FROM orders AS o LEFT JOIN products AS p ON o.product_id = p.id WHERE o.customer_id = {customer_id} AND o.id = {product_id}");
            _context.orders.FromSql($"DELETE o FROM orders AS o LEFT JOIN products AS p ON o.product_id = p.id WHERE o.customer_id = {customer_id} AND o.id = {product_id}");

            //List<Order> varriable;
            var varriable = _context.orders.FromSql($"SELECT o.* FROM orders AS o LEFT JOIN products AS p ON o.product_id = p.id WHERE o.customer_id = {customer_id} AND o.id = {product_id}").ToList();
            foreach (var item in varriable)
            {
                Delete(item);
            }

            //true
            //SELECT o.*FROM orders AS o LEFT JOIN products AS p ON o.product_id = p.id WHERE o.customer_id = 2013 AND o.id = 2002

        }
    }
}
