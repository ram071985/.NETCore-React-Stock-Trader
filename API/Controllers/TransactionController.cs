using Microsoft.AspNetCore.Mvc;
using CORE.Services;
using System;
using API.Models;

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
        public WalletModel WithdrawalTransaction([FromBody] WalletModel walletModel)
        {
                var wallet = _buyStockService.UpdateWalletPurchase(walletModel.UserId, walletModel.Balance);

                return new WalletModel
                {
                    UserId = wallet.UserId,
                    Balance = wallet.Balance
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

        [HttpPost("add-stock")]
        public StockModel AddNewStock([FromBody] StockModel stockModel)
        {          
                var record = _buyStockService.CreatePurchaseRecord(stockModel.UserId, stockModel.Company, stockModel.Symbol, stockModel.Quantity);

                return new StockModel
                {
                    UserId = record.UserId
                };           
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