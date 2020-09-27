using Microsoft.AspNetCore.Mvc;
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
            var user = _createNewUserService.CreateNewUser(
                        userInputModel.Username,
                        userInputModel.Password
                        );
                  
            var session = _createSessionService.CreateNewSession(
                        user.Id
                        );

             return new SessionModel
                {
                    Id = session.Id,
                    UserId = session.UserId,
                    CreatedDate = session.CreatedDate
                };                     
        }
    }

    public class UserInputModel
    {
        public string Username { get; set; }

        public string Password { get; set; }

    }
}