using System;
using System.Collections.Generic;
using CORE.Entities;
using NHibernate.Criterion;

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

        public SellStockService(IDbSessionService dbSessionService)
        {
            _dbSessionService = dbSessionService;
        }

        public Wallet UpdateWalletSale(int userId, decimal balance)
        {
            using (var session = _dbSessionService.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    var result = session.QueryOver<Wallet>()
                          .Where(w => w.UserId == userId)
                          .List<Wallet>();

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
                    var result = session.QueryOver<Stock>()
                        .Where(s => s.UserId == userId)
                        .Where(s => s.Symbol == symbol)
                        .List<Stock>();

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