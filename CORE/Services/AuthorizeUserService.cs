using System;
using CORE.DataAccess;
using CORE.Entities;

namespace CORE.Services
{
    public interface IAuthorizeUserService
    {
        Session GetSession(int id, int userId, string username, string password, DateTime createdDate, DateTime lastActiveAt);
    }

    public class AuthorizeUserService : IAuthorizeUserService
    {
        private ISessionDataAccess _sessionDataAccess;
        private IUserDataAccess _userDataAccess;


        public AuthorizeUserService(ISessionDataAccess sessionDataAccess, IUserDataAccess userDataAccess)
        {
            _sessionDataAccess = sessionDataAccess;
            _userDataAccess = userDataAccess;
        }

        public Session GetSession(int id, int userId, string username, string password, DateTime createdDate, DateTime lastActiveAt)
        {

            if (username == "")
            {
                throw new Exception("empty username");
            }

            if (password == "")
            {
                throw new Exception("empty password");
            }



            _userDataAccess.AddUser(id, username, password);

            return _sessionDataAccess.CreateSession(id, userId, lastActiveAt);

        }
    }


}