using System;
using CORE.Entities;

namespace CORE.Services
{
    public interface ISellStockService
    {
        Wallet UpdateWalletSale(int userId, decimal balance);
        Transaction AddDeposit(int userId, string exchange, decimal deposit, int quantity);
        Stock CreateSaleRecord(int userId, string company, string symbol, int quantity);
    }

    public class SellStockService : ISellStockService
    {
        private readonly IDbSessionService _dbSessionService;
        private readonly IWalletQueryService _walletQueryService;
        private readonly IStockQueryService _stockQueryService;

        public SellStockService(IDbSessionService dbSessionService, IWalletQueryService walletQueryService, IStockQueryService stockQueryService)
        {
            _dbSessionService = dbSessionService;
            _walletQueryService = walletQueryService;
            _stockQueryService = stockQueryService;
        }

        public Wallet UpdateWalletSale(int userId, decimal balance)
        {
            using (var session = _dbSessionService.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    var result = _walletQueryService.QueryWallets(session, userId);

                    result[0].Balance = result[0].Balance + balance;
                    result[0].Holdings = result[0].Holdings - balance;

                    session.SaveOrUpdate(result[0]);

                    transaction.Commit();

                    return result[0];
                }
            }
        }

        public Transaction AddDeposit(int userId, string exchange, decimal deposit, int quantity)
        {
            using (var session = _dbSessionService.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    var transactionObject = new Transaction
                    {
                        UserId = userId,
                        Exchange = exchange,
                        Withdrawal = deposit,
                        Quantity = quantity,
                        CreatedDate = DateTime.Now
                    };

                    session.Save(transactionObject);

                    transaction.Commit();

                    return transactionObject;
                }
            }
        }

        public Stock CreateSaleRecord(int userId, string company, string symbol, int quantity)
        {
            using (var session = _dbSessionService.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    var result = _stockQueryService.QueryStocks(session, userId, symbol);

                    if (result[0].Quantity - quantity > 0)
                    {
                        result[0].Quantity = result[0].Quantity - quantity;

                        session.SaveOrUpdate(result[0]);

                        transaction.Commit();

                        return result[0];
                    }

                    session.Delete(result[0]);

                    transaction.Commit();

                    return result[0];
                }
            }
        }
    }
}