using System;
using System.Reflection;
using CORE.Entities;
using NHibernate.Cfg;

namespace CORE.DataAccess
{
    public interface IUserDataAccess
    {

    }

    public class UserDataAccess : IUserDataAccess
    {
        public UserDataAccess AddUser(int id, string username, string password)
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
                    var userData = new User
                    {
                        Username = user.Username,
                        Password = user.Password

                    };

                    session.Save(userData);
                    transaction.Commit();
                }
            }
        }
    }

}
