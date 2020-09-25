using System;
using System.Reflection;
using CORE.Entities;
using NHibernate.Cfg;
using NHibernate.Dialect;

namespace CORE.DataAccess
{
    public interface IUserDataAccess
    {
        User AddUser(int id, string username, string password);
    }

    public class UserDataAccess : IUserDataAccess
    {
        public User AddUser(int id, string username, string password)
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
                    var userObject = new User();
                    var userData = new User
                    {
                        Id = userObject.Id,
                        Username = userObject.Username,
                        Password = userObject.Password

                    };

                    session.Save(userData);
                    transaction.Commit();

                    return userData;
                }
                
            }
        }
    }

}
