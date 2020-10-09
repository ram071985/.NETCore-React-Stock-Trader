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
        public ICreateWalletService _createWalletService;

        public AuthorizationController(IAuthorizeUserService authorizeUserService, ICreateSessionService createSessionService, ICreateWalletService createWalletService)
        {
            _authorizeUserService = authorizeUserService;
            _createSessionService = createSessionService;
            _createWalletService = createWalletService;
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

            var getUserId = _createWalletService.GetUserId(user.Id);

            if (getUserId != null)
            {
                var wallet = _createWalletService.InsertFirstDeposit(
                  user.Id
                  );
            }

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
        public int Id { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

    }
}