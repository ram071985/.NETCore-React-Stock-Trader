using System;
using CORE.Entities;
using NHibernate;
using NHibernate.Criterion;

namespace CORE.Services
{
    public interface ICreateWalletService
    {
        Wallet InsertFirstDeposit(int userId);
        Wallet GetUserId(int id);
    }

    public class CreateWalletService : ICreateWalletService
    {
        private readonly IDbSessionService _dbSessionService;

        public CreateWalletService(IDbSessionService dbSessionService)
        {
            _dbSessionService = dbSessionService;
        }

        public Wallet GetUserId(int userId)
        {
            using (var session = _dbSessionService.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    var walletData = new Wallet();
                    var wallet = new Wallet
                    {
                        UserId = userId
                    };

                    ICriteria c = session.CreateCriteria<Wallet>();
                    c.Add(Restrictions.Eq("UserId", userId));
                 
                    var result = c.UniqueResult<Wallet>();
                    transaction.Commit();

                    return result;
                }
            }
        }

        public Wallet InsertFirstDeposit(int userId)
        {

            using (var session = _dbSessionService.OpenSession())
            {

                using (var transaction = session.BeginTransaction())
                {                 
                    var wallet = new Wallet
                    {
                        UserId = userId,
                        Balance = 20000
                    };


                    session.Save(wallet);
                    transaction.Commit();

                    return wallet;
                }
            }
        }
    }
}