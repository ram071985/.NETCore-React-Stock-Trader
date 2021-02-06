using Microsoft.AspNetCore.Mvc;
using CORE.Services;
using System.Net.Http;
using Microsoft.Extensions.Configuration;
using API.Models;

namespace API.Controllers
{
    [ApiController]
    [Route("api/stocks")]

    public class StocksController : ControllerBase
    {       
        private string _token;
        private ISellStockService _sellStockService;

        public StocksController(IConfiguration configuration, ISellStockService sellStockService)
        {
            _token = configuration["IexConnection:Token"];
            _sellStockService = sellStockService;
        }

        [HttpGet("exchanges/{exchange}")]
        public string GetList(string exchange)
        {
            HttpClient http = new HttpClient();
            var data = http.GetAsync("https://cloud.iexapis.com/stable/stock/" + exchange + "/quote?token=" + _token).Result.Content.ReadAsStringAsync().Result;
            return data;              
        }

        [HttpGet("all")]
        public string GetAllStocks(string exchange)
        {
            HttpClient http = new HttpClient();
            var data = http.GetAsync("https://cloud.iexapis.com/stable/ref-data/symbols/" + "?token=" + _token).Result.Content.ReadAsStringAsync().Result;
            return data;
        }

        [HttpPost("quantity")]
        public StockModel GetShareQuantity([FromBody] StockModel stockModel)
        {
            var quantityResult = _sellStockService.CreateSaleRecord(stockModel.UserId, stockModel.Company, stockModel.Symbol, stockModel.Quantity);

            return new StockModel
            {
                Quantity = quantityResult.Quantity
            };
        }

        [HttpGet("history/{symbol}")]
        public string GetMonthHistory(string symbol)
        {
            HttpClient http = new HttpClient();
            var data = http.GetAsync("https://cloud.iexapis.com/stable/stock/" + symbol + "/chart/1m" + "?token=" + _token + "&chartCloseOnly=true").Result.Content.ReadAsStringAsync().Result;
            return data;
        }
    } 
}