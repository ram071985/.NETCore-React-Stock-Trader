using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using NHibernate.Cfg;
using NHibernate.Dialect;

namespace API.Controllers
{
    [ApiController]
    [Route("api/register")]

    public class RegisterContoller : ControllerBase
    {
        [HttpPost]
        public void PostNewUser([FromBody] UserModel user)
        {
            var config = new Configuration();

            config.DataBaseIntegration(x =>
            {
                x.ConnectionString = "Host=localhost;Database=postgres;Username=postgres;Password=postgres;";
                x.Dialect<PostgreSQLDialect>();
            });

            config.AddAssembly(Assembly.GetExecutingAssembly());

            var sessionFactory = config.BuildSessionFactory();

            using(var session = sessionFactory.OpenSession())
            {
                var userModel = new UserModel();

                session.Save(userModel);
            }

            

            
        }
    }
}