using Microsoft.AspNetCore.Mvc;
using CORE.Services;
using System.Threading.Tasks;
using RestSharp;
using System.Net.Http;
using System.Collections.Generic;
using System.Linq;

namespace API.Controllers
{
    [ApiController]
    [Route("api/stocks")]

    public class StocksController : ControllerBase
    {
        private ICreateNewUserService _createNewUserService;
        private ICreateSessionService _createSessionService;

        public StocksController(ICreateNewUserService createNewUserService, ICreateSessionService createSessionService)
        {
            _createNewUserService = createNewUserService;
            _createSessionService = createSessionService;
        }

        [HttpGet("exchanges/{exchange}")]
        public string GetList(string exchange)
        {
            HttpClient http = new HttpClient();
            var data = http.GetAsync("https://cloud.iexapis.com/stable/stock/" + exchange + "/quote?token=sk_6b25cd3525024af990dd9c79b83b72e7").Result.Content.ReadAsStringAsync().Result;
            return data;
         
               
        }
     
    }

    
  
}