using System.Collections.Generic;
using CORE.Entities;
using NHibernate;

namespace CORE.Services
{
    public interface IStockQueryService
    {
        IList<Stock> QueryStocks(ISession session, int userId, string symbol);
    }

    public class StockQueryService : IStockQueryService
    {
        public IList<Stock> QueryStocks(ISession session, int userId, string symbol)
        {
            return session.QueryOver<Stock>()
                        .Where(s => s.UserId == userId)
                        .Where(s => s.Symbol == symbol)
                        .List<Stock>();
        }
    }
}
