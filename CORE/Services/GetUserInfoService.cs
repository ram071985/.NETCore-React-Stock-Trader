using System.Collections.Generic;
using CORE.Entities;

namespace CORE.Services
{
    public interface IGetUserInfoService
    {
        Wallet GetUserInfo(int userId);
        List<Stock> GetUserStocks(int userId);
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
                    var result = session.QueryOver<Wallet>()
                        .Where(w => w.UserId == userId)                      
                        .List<Wallet>();                

                    transaction.Commit();
                    return result[0];
                }
            }
        }

        public List<Stock> GetUserStocks(int userId)
        {
            using (var session = _dbSessionService.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {                
                    var result = session.QueryOver<Stock>()
                       .Where(w => w.UserId == userId)
                       .List<Stock>();

                    transaction.Commit();
                    
                    return (List<Stock>)result;
                }
            }
        }
    }
}