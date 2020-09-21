using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Core.Services;

namespace API.Controllers
{
    [ApiController]
    [Route("api/register")]

    public class RegisterContoller : ContollerBase
    {
        [HttpPost]
        public UserModel PostNewUser([FromBody] UserModel user)
        {
            var userModel = new UserModel();
            var session = 
        }
    }
}