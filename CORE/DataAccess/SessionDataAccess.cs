using System;
using System.Reflection;
using CORE.Entities;
using NHibernate.Cfg;
using NHibernate.Dialect;

namespace CORE.DataAccess
{

    public interface ISessionDataAccess
    {
        public Session CreateSession(int id, int userId, DateTime lastActiveAt);
    }
    public class SessionDataAccess : ISessionDataAccess
    {
        private IUserDataAccess _userDataAccess;



        public SessionDataAccess(IUserDataAccess userDataAccess)
        {
            _userDataAccess = userDataAccess;
        }

        public Session CreateSession(int id, int userId, DateTime lastActiveAt)
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
                    var sessionEntity = new Session();
                    var sessionData = new Session
                    {
                        Id = sessionEntity.Id

                    };

                    session.Save(sessionData);
                    transaction.Commit();

                    return sessionData;
                }

            }
        }
    }
}


