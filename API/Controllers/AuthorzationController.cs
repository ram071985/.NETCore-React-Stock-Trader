using System.Reflection;
using System;
using CORE.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using NHibernate.Cfg;
using NHibernate.Dialect;
using NHibernate.Criterion;
using NHibernate;

namespace API.Controllers
{
    [ApiController]
    [Route("api/authorize")]

    public class AuthorizationController : ControllerBase
    {
        [HttpPost]
        public UserModel AuthorizeUser([FromBody] User user)
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

                    var query = session.CreateCriteria<User>()
                           .Add(Expression.Like("Username", user.Username))
                           .List<User>();



                    transaction.Commit();

                    return new UserModel
                    {
                       Username = query[0].Username
                    };



                }    

            }
        }
    }
}