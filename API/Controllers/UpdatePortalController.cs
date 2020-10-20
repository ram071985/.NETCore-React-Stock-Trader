using Microsoft.AspNetCore.Mvc;
using CORE.Services;
using System.Collections.Generic;
using CORE.Entities;
using System.Net.Http;
using Microsoft.Extensions.Configuration;

namespace API.Controllers
{
    [ApiController]
    [Route("api/update-portal")]

    public class UpdatePortalController : ControllerBase
    {
        private IGetUserInfoService _getUserInfoService;
        private string _token;

        public UpdatePortalController(IGetUserInfoService getUserInfoService, IConfiguration configuration)
        {
            _getUserInfoService = getUserInfoService;
            _token = configuration["IexConnection:Token"];
        }

        [HttpPost]
        public WalletModel GetUserObject([FromBody] WalletModel walletModel)
        {
            var userData = _getUserInfoService.GetUserInfo(walletModel.UserId);

            return new WalletModel
            {   
                Balance = userData.Balance,
                Username = userData.Username,
                Holdings = userData.Holdings
            };
        }

        [HttpPost("stocks")]
        public StockModel GetStocks([FromBody] StockModel stockModel)
        {
            var stocks = _getUserInfoService.GetStocks(stockModel.UserId);
            return new StockModel
            {
                Quantity = stocks.Quantity,
                Company = stocks.Company
            };
        }
    }
}
