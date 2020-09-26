using System;
using CORE.Entities;

namespace CORE.Services
{
    public interface ICreateNewUserService
    {
        User CreateNewUser(string username, string password);
    }

    public class CreateNewUserService : ICreateNewUserService
    {
        private readonly IDbSessionService _dbSessionService;

        public CreateNewUserService(IDbSessionService dbSessionService)
        {
            _dbSessionService = dbSessionService;
        }

        public User CreateNewUser(string username, string password)
        {
            using (var session = _dbSessionService.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    var user = new User
                    {
                        Username = username,
                        Password = password,
                        CreatedDate = DateTime.Now,
                        LastActiveAt = DateTime.Now
                    };

                    session.Save(user);
                    transaction.Commit();

                    return user;
                }
            }
        }
    }
}
