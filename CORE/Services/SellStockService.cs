using System;
using System.Collections.Generic;
using CORE.Entities;
using NHibernate.Criterion;

namespace CORE.Services
{
    public interface ISellStockService
    {
        Stock GetShareQuantity(int userId, string company);
    }

    public class SellStockService : ISellStockService
    {
        private readonly IDbSessionService _dbSessionService;

        public SellStockService(IDbSessionService dbSessionService)
        {
            _dbSessionService = dbSessionService;
        }

        public Stock GetShareQuantity(int userId, string company)
        {
            using (var session = _dbSessionService.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    var result = session.QueryOver<Stock>()
                        .Where(s => s.UserId == userId)
                        .Where(s => s.Company == company)
                        .List<Stock>();

                    transaction.Commit();

                    return result[0];                       
                }       
            }
        }
    }
}