using System.Reflection;
using System;
using CORE.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using NHibernate.Cfg;
using NHibernate.Dialect;
using CORE.Services;

namespace API.Controllers
{
    [ApiController]
    [Route("api/register")]

    public class RegisterController : ControllerBase
    {

        private ICreateNewUserService _createNewUserService;
        private ICreateSessionService _createSessionService;


        public RegisterController(ICreateNewUserService createNewUserService, ICreateSessionService createSessionService)
        {
            _createNewUserService = createNewUserService;
            _createSessionService = createSessionService;
        }

        [HttpPost]
        public SessionModel PostNewUser([FromBody] UserInputModel userInputModel)
        {

            var config = new Configuration();

            config.DataBaseIntegration(x =>
            {
                x.ConnectionString = "Host=otto.db.elephantsql.com;Database=aemtrcbd;Username=aemtrcbd;Password=yzAmcOsG2OPU0E5e2LNS9JoG_KzZcgWw;";
                x.Dialect<PostgreSQLDialect>();
            });

            config.AddAssembly(Assembly.GetExecutingAssembly());

            var sessionFactory = config.BuildSessionFactory();

             using (var dataSession = sessionFactory.OpenSession())
            {
                using (var transaction = dataSession.BeginTransaction())
                {

                    var user = _createNewUserService.CreateNewUser(
                        userInputModel.Username,
                        userInputModel.Password
                        );

                    var session = _createSessionService.CreateNewSession();


                    return new SessionModel
                    {
                        Id = session.Id,
                        UserId = session.UserId,
                        CreatedDate = session.CreatedDate
                    };

                }              
             }                       
        }
    }

    public class UserInputModel
    {
        public string Username { get; set; }

        public string Password { get; set; }

    }
}