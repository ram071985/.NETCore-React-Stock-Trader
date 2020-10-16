using Microsoft.AspNetCore.Mvc;
using CORE.Services;

namespace API.Controllers
{
    [ApiController]
    [Route("api/transaction")]

    public class TransactionController : ControllerBase
    {
        private IAuthorizeUserService _authorizeUserService;
        private IBuyStockService _buyStockService;

        public TransactionController(IAuthorizeUserService authorizeUserService, IBuyStockService buyStockService)
        {
            _authorizeUserService = authorizeUserService;
            _buyStockService = buyStockService;
        }

        [HttpPost("buy")]
        public WalletModel WithdrawalTransaction([FromBody] WalletModel walletModel)
        {
            var update = _buyStockService.UpdateWallet(walletModel.UserId, walletModel.Balance);

            return new WalletModel
            {
                UserId = update.UserId,
                Balance = update.Balance
            };
        }

        [HttpPost("sell")]
        public void DepositTransaction([FromBody] UserAuthInputModel userAuthInputModel)
        {

        }

    }

}