using Microsoft.AspNetCore.Mvc;
using CORE.Services;
using System.Threading.Tasks;
using RestSharp;

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

        [HttpGet]
        public async Task<IActionResult> GetStocks()
        {
            var client = new RestClient("");
            var request = new RestRequest(Method.GET);
            IRestResponse response = await client.ExecuteAsync(request);
        }
     
    }

    
  
}