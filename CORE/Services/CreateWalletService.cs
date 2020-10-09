using System;
using CORE.Entities;
using NHibernate.Criterion;

namespace CORE.Services
{
    public interface ICreateWalletService
    {
        Wallet InsertFirstDeposit(int userId);
        User GetUserId(int id);
    }

    public class CreateWalletService : ICreateWalletService
    {
        private readonly IDbSessionService _dbSessionService;

        public CreateWalletService(IDbSessionService dbSessionService)
        {
            _dbSessionService = dbSessionService;
        }

        public User GetUserId(int id)
        {
            using (var session = _dbSessionService.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    var user = new User
                    {
                        Id = id
                    };

                    var query = session.CreateCriteria<User>()
                            .Add(Restrictions.Like("Id", id))
                            .List<User>();

                    transaction.Commit();

                    return query[0];
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

                    var query = session.CreateCriteria<Wallet>()
                            .Add(Restrictions.Like("UserId", userId))
                            .List<Wallet>();

                    session.Save(wallet);
                    transaction.Commit();

                    return wallet;
                }
            }
        }
    }
}