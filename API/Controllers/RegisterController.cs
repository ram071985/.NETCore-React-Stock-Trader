using System.Reflection;
using API;
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
        public void PostNewUser([FromBody] User user)
        {
            var config = new Configuration();

            config.DataBaseIntegration(x =>
            {
                x.ConnectionString = "Host=otto.db.elephantsql.com;Database=aemtrcbd;Username=aemtrcbd;Password=yzAmcOsG2OPU0E5e2LNS9JoG_KzZcgWw;";
                x.Dialect<PostgreSQLDialect>();
            });

            config.AddAssembly(Assembly.GetExecutingAssembly());

            var sessionFactory = config.BuildSessionFactory();

            using(var session = sessionFactory.OpenSession())
            {
                var userModel = new User
                {

                }




                session.Save(userModel);
            }

            

            
        }
    }
}