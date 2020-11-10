using System;
using CORE.Entities;
using NHibernate;
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

                    if (username == "" && password == "")
                    {
                        throw new Exception("empty username and password");
                    }

                    if (username == "" && password != "")
                    {
                        throw new Exception("empty username");
                    }

                    if (password == "" && username != "")
                    {
                        throw new Exception("empty password");
                    }

                    var result = session.QueryOver<User>()
                       .Where(w => w.Username == username)
                       .List<User>();

                    if (result.Count != 0)
                    {
                        throw new Exception("redundant username");
                    }

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
