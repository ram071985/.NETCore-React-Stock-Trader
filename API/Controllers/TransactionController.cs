using Microsoft.AspNetCore.Mvc;
using CORE.Services;
using System;

namespace API.Controllers
{
    [ApiController]
    [Route("api/transaction")]

    public class TransactionController : ControllerBase
    {
        private IAuthorizeUserService _authorizeUserService;
        private IBuyStockService _buyStockService;
        private ISellStockService _sellStockService;

        public TransactionController(IAuthorizeUserService authorizeUserService, IBuyStockService buyStockService, ISellStockService sellStockService)
        {
            _authorizeUserService = authorizeUserService;
            _buyStockService = buyStockService;
            _sellStockService = sellStockService;
        }

        [HttpPut("buy")]
        public IActionResult WithdrawalTransaction([FromBody] WalletModel walletModel)
        {
            try
            {
                var update = _buyStockService.UpdateWalletPurchase(walletModel.UserId, walletModel.Balance);

                return Ok(new WalletModel
                {
                    UserId = update.UserId,
                    Balance = update.Balance
                });
            }
            catch (Exception e)
            {
                return Problem(e.Message, statusCode: 500, title: "Something went wrong");
            }
        }

        [HttpPost("buy")]
        public IActionResult AddTransactionRecord([FromBody] TransactionModel transactionModel)
        {
            try
            {
                var transaction = _buyStockService.AddWithdrawal(transactionModel.UserId, transactionModel.Exchange, transactionModel.Withdrawal, transactionModel.Quantity);

                return Ok(new TransactionModel
                {
                    Withdrawal = transaction.Withdrawal
                });
            }
            catch(Exception e)
            {
                return Problem(e.Message, statusCode: 500, title: "Something went wrong");
            }
        }

        [HttpPost("add-stock")]
        public IActionResult AddNewStock([FromBody] StockModel stockModel)
        {
            try
            {
                var record = _buyStockService.CreatePurchaseRecord(stockModel.UserId, stockModel.Company, stockModel.Symbol, stockModel.Quantity);

                return Ok(new StockModel
                {
                    UserId = record.UserId
                });
            }

            catch(Exception e)
            {
                return Problem(e.Message, statusCode: 500, title: "Something went wrong");
            }
        }

        [HttpPut("sell")]
        public WalletModel AddToBalance([FromBody] WalletModel walletModel)
        {
            var update = _sellStockService.UpdateWalletSale(walletModel.UserId, walletModel.Balance);

            return new WalletModel
            {
                UserId = update.UserId,
                Balance = update.Balance
            };
        }


        [HttpPost("sell")]
        public TransactionModel DepositTransaction([FromBody] TransactionModel transactionModel)
        {
            var transaction = _sellStockService.AddDeposit(transactionModel.UserId, transactionModel.Exchange, transactionModel.Deposit, transactionModel.Quantity);

            return new TransactionModel
            {
                Withdrawal = transaction.Withdrawal
            };
        }

        [HttpPost("delete-stock")]
        public StockModel DeleteStock([FromBody] StockModel stockModel)
        {
            var record = _sellStockService.CreateSaleRecord(stockModel.UserId, stockModel.Company, stockModel.Symbol, stockModel.Quantity);

            return new StockModel
            {
                UserId = record.UserId
            };
        }
    }
}