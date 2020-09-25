using System.Reflection;
using System;
using CORE.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using NHibernate.Cfg;
using NHibernate.Dialect;

namespace API.Controllers
{
    [ApiController]
    [Route("api/register")]

    public class RegisterController : ControllerBase
    {
        [HttpPost]
        public SessionModel PostNewUser([FromBody] User user)
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

                    var sessionData = new Session
                    {
                        UserId = userData.Id
                    };

                    session.Save(sessionData);

                    transaction.Commit();


                    return new SessionModel
                    {
                        Id = sessionData.Id,
                        UserId = sessionData.UserId
                    };

                }              
             }                       
        }
    }
}