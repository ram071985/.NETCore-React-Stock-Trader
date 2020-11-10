using Microsoft.AspNetCore.Mvc;
using CORE.Services;
using System;

namespace API.Controllers
{
    [ApiController]
    [Route("api/register")]

    public class RegisterController : ControllerBase
    {
        private ICreateNewUserService _createNewUserService;
        private ICreateSessionService _createSessionService;
        public ICreateWalletService _createWalletService;

        public RegisterController(ICreateNewUserService createNewUserService, ICreateSessionService createSessionService, ICreateWalletService createWalletService)
        {
            _createNewUserService = createNewUserService;
            _createSessionService = createSessionService;
            _createWalletService = createWalletService;
        }

        [HttpPost]
        public IActionResult PostNewUser([FromBody] UserInputModel userInputModel)
        {
            try
            {
                var user = _createNewUserService.CreateNewUser(
                    userInputModel.Username,
                    userInputModel.Password

                    );

                var session = _createSessionService.CreateNewSession(
                    user.Id
                    );

                var wallet = _createWalletService.InsertFirstDeposit(
                  user.Id, user.Username
                  );


                return Ok(new SessionModel
                {
                    Id = session.Id,
                    UserId = session.UserId,
                    CreatedDate = session.CreatedDate
                });
            }
            catch (Exception e)
            {
                return Problem(e.Message, statusCode: 500, title: "Something went wrong");
            }
        }
    }

    public class UserInputModel
    {
        public string Username { get; set; }

        public string Password { get; set; }

    }
}