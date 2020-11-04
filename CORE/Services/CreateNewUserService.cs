using System;
using CORE.Entities;
using NHibernate;
using NHibernate.Criterion;

namespace CORE.Services
{
    public interface ICreateNewUserService
    {
        User CreateNewUser(int id, string username, string password);
    }

    public class CreateNewUserService : ICreateNewUserService
    {
        private readonly IDbSessionService _dbSessionService;

        public CreateNewUserService(IDbSessionService dbSessionService)
        {
            _dbSessionService = dbSessionService;
        }

        public User CreateNewUser(int id, string username, string password)
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
                        Id = id,
                        Username = username,
                        Password = password,
                        CreatedDate = DateTime.Now,
                        LastActiveAt = DateTime.Now
                    };

                    ICriteria c = session.CreateCriteria<User>();
                    c.Add(Restrictions.Eq("Username", username));                   
               

                    if(c.UniqueResult<User>() != null)
                    {
                        throw new Exception("username exists");
                    }

                    session.Save(user);
                    transaction.Commit();

                    return user;
                }
            }
        }
    }
}
