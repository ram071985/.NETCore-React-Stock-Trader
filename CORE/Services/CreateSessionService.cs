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
        public Session CreateNewSession(int userId)
        {
            var config = new Configuration();

            config.DataBaseIntegration(x =>
            {
                x.ConnectionString = "Host=otto.db.elephantsql.com;Database=aemtrcbd;Username=aemtrcbd;Password=yzAmcOsG2OPU0E5e2LNS9JoG_KzZcgWw;";
                x.Dialect<PostgreSQLDialect>();
            });

            config.AddAssembly(Assembly.GetExecutingAssembly());

            var sessionFactory = config.BuildSessionFactory();

            using (var session = sessionFactory.OpenSession())
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