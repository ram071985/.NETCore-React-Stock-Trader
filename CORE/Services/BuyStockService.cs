using System;
using CORE.Entities;
using NHibernate.Criterion;

namespace CORE.Services
{
    public interface IBuyStockService
    {
        Wallet UpdateWallet(int userId, decimal balance);
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
                    var walletObject = new Wallet
                    {
                        
                    };

                    Wallet wallet = session.Get<Wallet>(userId);

                    return wallet;
                }
            }
        }
    }
}
