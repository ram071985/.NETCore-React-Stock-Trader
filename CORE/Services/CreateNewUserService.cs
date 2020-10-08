using System;
using CORE.Entities;
using NHibernate.Criterion;

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

                    if (username == "")
                    {
                        throw new Exception("empty username");
                    }

                    if (password == "")
                    {
                        throw new Exception("empty password");
                    }

                    

                    var user = new User
                    {
                        Username = username,
                        Password = password,
                        CreatedDate = DateTime.Now,
                        LastActiveAt = DateTime.Now
                    };

                    var query = session.CreateCriteria<User>()
                        .Add(Restrictions.Like("Username", username))
                        .List<User>();

                    if (user.Username == username)
                    {
                        throw new Exception("username already exists");
                    }

                    session.Save(user);
                    transaction.Commit();

                    return user;
                }
            }
        }
    }
}
