using CORE.Entities;
using NHibernate;
using NHibernate.Cfg;
using NHibernate.Dialect;

namespace CORE.Services
{
    public interface IGetUserInfoService
    {
        Wallet GetUserInfo(int userId);
    }

    public class GetUserInfoService : IGetUserInfoService
    {
        private readonly IDbSessionService _dbSessionService;

        public GetUserInfoService(IDbSessionService dbSessionService)
        {
            _dbSessionService = dbSessionService;
        }

        public Wallet GetUserInfo(int userId)
        {

            using (var session = _dbSessionService.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {

                    Wallet walletAlias = null;
                    User userAlias = null;
                    List<Wallet> result = session.QueryOver<User>()
                        .JoinAlias(x => x.Id, () => userAlias)
                        .SelectList(list => list
                        .Select(x => x.Username).WithAlias(() => userAlias.Username)
                        .Select(x => x.)
                   
                    var userQuery = session.QueryOver<Wallet>()
                    .Select(w => w.Balance)
                    .Where(w => w.UserId == userId)
                    .List<Wallet>();


                    transaction.Commit();

                    return (Wallet)userQuery;
                }

            }
        }
    }


}