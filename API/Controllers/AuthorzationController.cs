using Microsoft.AspNetCore.Mvc;
using CORE.Services;

namespace API.Controllers
{
    [ApiController]
    [Route("api/authorize")]

    public class AuthorizationController : ControllerBase
    {
        private IAuthorizeUserService _authorizeUserService;
        private ICreateSessionService _createSessionService;

        public AuthorizationController(IAuthorizeUserService authorizeUserService, ICreateSessionService createSessionService)
        {
            _authorizeUserService = authorizeUserService;
            _createSessionService = createSessionService;
        }

        [HttpPost]
        public SessionModel AuthorizeUser([FromBody] UserAuthInputModel userAuthInputModel)
        {

            var user = _authorizeUserService.AuthorizeUser(
                userAuthInputModel.Username,
                userAuthInputModel.Password
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

    public class UserAuthInputModel
    {
        public string Username { get; set; }

        public string Password { get; set; }

    }
}