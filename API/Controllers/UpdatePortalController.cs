using Microsoft.AspNetCore.Mvc;
using CORE.Services;
using System.Collections.Generic;
using CORE.Entities;

namespace API.Controllers
{
    [ApiController]
    [Route("api/update-portal")]

    public class UpdatePortalController : ControllerBase
    {
        private IGetUserInfoService _getUserInfoService;

        public UpdatePortalController(IGetUserInfoService getUserInfoService)
        {
            _getUserInfoService = getUserInfoService;
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
    }
}
