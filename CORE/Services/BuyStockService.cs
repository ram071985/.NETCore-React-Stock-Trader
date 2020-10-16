using System;
using CORE.Entities;
using NHibernate.Criterion;

namespace CORE.Services
{
    public interface IBuyStockService
    {
        void UpdateWallet(int userId, int balance);
    }

    public class BuyStockService : IBuyStockService
    {
        private readonly IDbSessionService _dbSessionService;

        public BuyStockService(IDbSessionService dbSessionService)
        {
            _dbSessionService = dbSessionService;
        }

        public void UpdateWallet(int userId, int balance)
        {
            using (var session = _dbSessionService.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    var wallet = new Wallet
                    {

                    };
                }
            }
        }
    }
}
