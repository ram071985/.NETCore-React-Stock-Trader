using System;
using System.Transactions;
using CORE.Entities;
using NHibernate.Criterion;

namespace CORE.Services
{
    public interface IAuthorizeUserService
    {
        User AuthorizeUser(string username, string password);
    }

    public class AuthorizeUserService : IAuthorizeUserService
    {
        private readonly IDbSessionService _dbSessionService;



        public AuthorizeUserService(IDbSessionService dbSessionService)
        {
            _dbSessionService = dbSessionService;
        }

            public User AuthorizeUser(string username, string password)
            {

                using (var session = _dbSessionService.OpenSession())
                {

                    using (var transaction = session.BeginTransaction())
                    {
                        var user = new User
                        {
                            Username = username,
                            Password = password
                        };

                        var query = session.CreateCriteria<User>()
                           .Add(Restrictions.Like("Username", username))
                           .List<User>();

                        if (username == "")
                        {
                            throw new Exception("empty username");
                        }

                        if (password == "")
                        {
                            throw new Exception("empty password");
                        }

                        transaction.Commit();
                        return user;
                    }
                }
            }           
        }
    }
}