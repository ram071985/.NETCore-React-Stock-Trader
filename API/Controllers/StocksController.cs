using Microsoft.AspNetCore.Mvc;
using CORE.Services;
using System.Threading.Tasks;
using RestSharp;
using System.Net.Http;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;

namespace API.Controllers
{
    [ApiController]
    [Route("api/stocks")]

    public class StocksController : ControllerBase
    {
       
        private string _token;

        public StocksController(IConfiguration configuration)
        {
            _token = configuration["IexConnection:Token"];
        }

        [HttpGet("exchanges/{exchange}")]
        public string GetList(string exchange)
        {
            HttpClient http = new HttpClient();
            var data = http.GetAsync("https://cloud.iexapis.com/stable/stock/" + exchange + "/quote?token=" + _token).Result.Content.ReadAsStringAsync().Result;
            return data;
         
               
        }
     
    }

    
  
}