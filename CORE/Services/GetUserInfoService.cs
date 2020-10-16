﻿using System.Collections.Generic;
using CORE.Entities;
using NHibernate;
using NHibernate.Cfg;
using NHibernate.Dialect;
using NHibernate.Mapping;

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
                    var result = session.QueryOver<Wallet>()
                        .Where(w => w.UserId == userId)                      
                        .List<Wallet>();                

                    transaction.Commit();

                    return result[0];
                }
            }
        }
    }
}