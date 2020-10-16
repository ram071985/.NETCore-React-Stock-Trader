using Microsoft.AspNetCore.Mvc;
using CORE.Services;

namespace API.Controllers
{
    [ApiController]
    [Route("api/transaction")]

    public class TransactionController : ControllerBase
    {
        private IAuthorizeUserService _authorizeUserService;
        private ICreateSessionService _createSessionService;
        private ICreateWalletService _createWalletService;

        public TransactionController(IAuthorizeUserService authorizeUserService, ICreateSessionService createSessionService, ICreateWalletService createWalletService)
        {
            _authorizeUserService = authorizeUserService;
            _createSessionService = createSessionService;
            _createWalletService = createWalletService;
        }

        [HttpPost("buy")]
        public void WithdrawalTransaction([FromBody] UserAuthInputModel userAuthInputModel)
        {
           
        }

        [HttpPost("sell")]
        public void DepositTransaction([FromBody] UserAuthInputModel userAuthInputModel)
        {

        }

    }

}