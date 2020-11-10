﻿using System;
using CORE.Entities;
using NHibernate.Criterion;

namespace CORE.Services
{
    public interface IBuyStockService
    {
        Wallet UpdateWalletPurchase(int userId, decimal balance);
        Transaction AddWithdrawal(int userId, string symbol, decimal withdrawal, int quantity);
        Stock CreatePurchaseRecord(int userId, string company, string symbol, int quantity);
    }

    public class BuyStockService : IBuyStockService
    {
        private readonly IDbSessionService _dbSessionService;

        public BuyStockService(IDbSessionService dbSessionService)
        {
            _dbSessionService = dbSessionService;
        }

        public Wallet UpdateWalletPurchase(int userId, decimal balance)
        {
            using (var session = _dbSessionService.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    var result = session.QueryOver<Wallet>()
                        .Where(w => w.UserId == userId)
                        .List<Wallet>();

                    var resultArray = result[0];

                    if (resultArray.Balance - balance < 0)
                    {
                        throw new Exception("insufficient balance");
                    }

                    resultArray.Balance = resultArray.Balance - balance;
                    resultArray.Holdings = resultArray.Holdings + balance;
                                 
                    session.SaveOrUpdate(resultArray);

                    transaction.Commit();

                    return result[0];
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
                        Quantity = quantity,
                        CreatedDate = DateTime.Now
                    };

                    session.Save(transactionObject);

                    transaction.Commit();

                    return transactionObject;
                }
            }
        }

        public Stock CreatePurchaseRecord(int userId, string company, string symbol, int quantity)
        {
            using (var session = _dbSessionService.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    var result = session.QueryOver<Stock>()
                        .Where(s => s.UserId == userId)
                        .Where(s => s.Symbol == symbol)
                        .List<Stock>();

                    if (result.Count != 0)
                    {
                        result[0].Quantity = result[0].Quantity + quantity;

                        session.SaveOrUpdate(result[0]);

                        transaction.Commit();

                        return result[0];
                    }

                    var stockObject = new Stock
                    {
                        UserId = userId,
                        Company = company,
                        Symbol = symbol,
                        Quantity = quantity,
                        CreatedDate = DateTime.Now
                    };

                    session.Save(stockObject);

                    transaction.Commit();

                    return stockObject;
                }
            }
        }
    }
}
