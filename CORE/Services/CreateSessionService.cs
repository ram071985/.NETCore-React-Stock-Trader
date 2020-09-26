using System;
using System.Reflection;
using CORE.Entities;
using NHibernate.Cfg;
using NHibernate.Dialect;

namespace CORE.Services
{
    public interface ICreateSessionService
    {
        Session CreateNewSession(int userId);
    }

    public class CreateSessionService : ICreateSessionService
    {
        private readonly IDbSessionService _dbSessionService;

        public CreateSessionService(IDbSessionService dbSessionService)
        {
            _dbSessionService = dbSessionService;
        }

        public Session CreateNewSession(int userId)
        {

            using (var session = _dbSessionService.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {                
                    var sessionData = new Session
                    {
                        UserId = userId,
                        CreatedDate = DateTime.Now,                      
                    };

                    session.Save(sessionData);
                    transaction.Commit();

                    return sessionData;
                }

            }
        }
    }


}