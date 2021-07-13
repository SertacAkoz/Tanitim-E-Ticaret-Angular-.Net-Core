using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TayyibAla.API.Data;
using TayyibAla.API.Dtos;
using TayyibAla.API.Models;

namespace TayyibAla.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private IAppRepo _appRepo;

        public ProductsController(IAppRepo appRepo)
        {
            _appRepo = appRepo;
        }
        [HttpGet]
        public ActionResult GetProducts()
        {
            var products = _appRepo.GetProducts();

            return Ok(products);
        }
        [HttpPost("add")]
        public async Task<ActionResult> AddOrder([FromBody] OrderForAdd order)
        {
            var orderToAdd = new Order
            {
                customer_id = order.customer_id,
                product_id = order.product_id,
                status = 1
            };

            var addedOrder = await _appRepo.AddOrder(orderToAdd);

            return Ok(orderToAdd);
        }

        [HttpGet("{customer_id}")]
        public ActionResult GetOrderedProductsByCustomerId(int customer_id)
        {
            //var customer = await _authRepository.GetCurrentCustomer(e_mail);

            var products =  _appRepo.GetOrderedProductsByCustomerId(customer_id);

            if (products == null)
            {
                return Unauthorized();
            }
            return Ok(products);
        }

        [HttpPost("{product_id}/{customer_id}")]
        public ActionResult DeleteOrderedProduct(int product_id, int customer_id)
        {
            _appRepo.DeleteOrderedProduct(product_id, customer_id);
            _appRepo.SaveAll();

            return StatusCode(200);
        }

        //select o.* from orders as o left join products as p on o.product_id= p.id where o.customer_id = 2013
    }
}