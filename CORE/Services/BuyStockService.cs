using System;
using CORE.Entities;
using NHibernate.Criterion;

namespace CORE.Services
{
    public interface IBuyStockService
    {
        Wallet UpdateWallet(int userId, decimal balance);
        Transaction AddWithdrawal(int userId, string symbol, decimal withdrawal, int quantity);
    }

    public class BuyStockService : IBuyStockService
    {
        private readonly IDbSessionService _dbSessionService;

        public BuyStockService(IDbSessionService dbSessionService)
        {
            _dbSessionService = dbSessionService;
        }

        public Wallet UpdateWallet(int userId, decimal balance)
        {
            using (var session = _dbSessionService.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {                
                    Wallet wallet = session.Get<Wallet>(userId);
                    wallet.Balance = wallet.Balance - balance;
                    wallet.Holdings = wallet.Holdings + balance;

                    session.SaveOrUpdate(wallet);

                    transaction.Commit();

                    return wallet;
                }
            }
        }

        public Transaction AddWithdrawal(int userId, string exchange, decimal withdrawal, int quantity)
        {
            using (var session = _dbSessionService.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    var transactionObject = new Transaction
                    {
                        UserId = userId,
                        Exchange = exchange,
                        Withdrawal = withdrawal,
                        Quantity = quantity
                    };

                    session.Save(transactionObject);

                    transaction.Commit();

                    return transactionObject;
                }
            }
        }
    }
}
