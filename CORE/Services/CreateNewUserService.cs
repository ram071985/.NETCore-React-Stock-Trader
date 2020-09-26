using System;
using System.Reflection;
using CORE.DataAccess;
using CORE.Entities;
using NHibernate.Cfg;
using NHibernate.Dialect;

namespace CORE.Services
{
    public interface ICreateNewUserService
    {
        User CreateNewUser(string username, string password);
    }

    public class CreateNewUserService : ICreateNewUserService
    {

        public User CreateNewUser(string username, string password)
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
                    var user = new User
                    {
                        Username = username,
                        Password = password,
                        CreatedDate = DateTime.Now,
                        LastActiveAt = DateTime.Now
                    };

                    session.Save(user);
                    transaction.Commit();

                    return user;
                }

            }
        }
    }


}
