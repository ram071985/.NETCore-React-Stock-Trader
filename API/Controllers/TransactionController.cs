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

        [HttpPut("buy")]
        public WalletModel WithdrawalTransaction([FromBody] WalletModel walletModel)
        {
            var update = _buyStockService.UpdateWallet(walletModel.UserId, walletModel.Balance);

            return new WalletModel
            {
                UserId = update.UserId,
                Balance = update.Balance
            };
        }

        [HttpPost("buy")]
        public TransactionModel AddTransactionRecord([FromBody] TransactionModel transactionModel)
        {
            var transaction = _buyStockService.AddWithdrawal(transactionModel.UserId, transactionModel.Exchange, transactionModel.Withdrawal, transactionModel.Quantity);

            return new TransactionModel
            {
                Withdrawal = transaction.Withdrawal
            };
        }

        [HttpPost("sell")]
        public void DepositTransaction([FromBody] UserAuthInputModel userAuthInputModel)
        {

        }

    }

}