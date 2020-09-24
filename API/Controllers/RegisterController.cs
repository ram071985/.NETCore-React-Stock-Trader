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

        public RegisterController(IConfiguration configuration, ICreateNewUserService createNewUserService) 
        {
            _createNewUserService = createNewUserService;
        }

        [HttpPost]
        public SessionModel PostNewUser([FromBody] UserModel user)
        {
            var sessionModel = new SessionModel();
            var session = _createNewUserService.PostNewUser(user.Id, sessionModel.UserId, user.Username, user.Password, user.CreatedDate, user.LastActiveAt);

            return new SessionModel
            {
                Id = session.Id,
                UserId = sessionModel.UserId
            }
        }


    }
}