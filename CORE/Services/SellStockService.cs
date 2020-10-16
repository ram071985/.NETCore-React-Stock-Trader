using System;
using CORE.Entities;
using NHibernate.Criterion;

namespace CORE.Services
{
    public interface ISellStockService
    {
        void AuthorizeUser(string username, string password);
    }

    public class SellStockService : ISellStockService
    {
        private readonly IDbSessionService _dbSessionService;

        public SellStockService(IDbSessionService dbSessionService)
        {
            _dbSessionService = dbSessionService;
        }

        public void AuthorizeUser(string username, string password)
        {

            
        }
    }
}