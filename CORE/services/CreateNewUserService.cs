using System;
using CORE.DataAccess;
using CORE.Entities;

namespace CORE.Services
{
    public interface ICreateNewUserService
    {
        Session PostNewUser(int id, int userId, string username, string password, DateTime createdDate, DateTime lastActiveAt);
    }

    public class CreateNewUserService : ICreateNewUserService
    {
        private ISessionDataAccess _sessionDataAccess;
        private IUserDataAccess _userDataAccess;


        public CreateNewUserService(ISessionDataAccess sessionDataAccess, IUserDataAccess userDataAccess)
        {
            _sessionDataAccess = sessionDataAccess;
            _userDataAccess = userDataAccess;
        }

        public Session PostNewUser(int id, int userId, string username, string password, DateTime createdDate, DateTime lastActiveAt)
        {
            _userDataAccess.AddUser(id, username, password);

            return _sessionDataAccess.CreateSession(id, userId, lastActiveAt);

        }
    }


}
