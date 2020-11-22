using System;
using System.Collections.Generic;
using CORE.Entities;
using NHibernate;

namespace CORE.Services
{

    public interface IWalletQueryService
    {
        IList<Wallet> QueryWallets(ISession session, int userId);
    }


    public class WalletQueryService : IWalletQueryService
    {
        public IList<Wallet> QueryWallets(ISession session, int userId)
        {
            return session.QueryOver<Wallet>()
                        .Where(w => w.UserId == userId)
                        .List<Wallet>();
        }
    }
}
