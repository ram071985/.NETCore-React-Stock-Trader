using System.Reflection;
using Microsoft.Extensions.Configuration;
using NHibernate;
using NHibernate.Cfg;
using NHibernate.Dialect;

namespace CORE.Services
{

    public interface IDbSessionService
    {
        ISession OpenSession();
    }
    public class DbSessionService : IDbSessionService
    {
        private readonly ISessionFactory _sessionFactory;

        private string _databaseUsername;
        private string _databasePassword;
        private string _databaseHost;
        private string _databaseName;

        public DbSessionService(IConfiguration configuration)
        {
            var config = new Configuration();

            _databaseUsername = configuration["Database:Username"];
            _databasePassword = configuration["Database:Password"];
            _databaseHost = configuration["Database:Host"];
            _databaseName = configuration["Database:Name"];

            config.DataBaseIntegration(x =>
            {
                x.ConnectionString = "Host=" + _databaseHost + ";Database=" + _databaseName + ";Username=" + _databaseUsername + ";Password=" + _databasePassword;
                x.Dialect<PostgreSQLDialect>();
            });

            config.AddAssembly(Assembly.GetExecutingAssembly());

            _sessionFactory = config.BuildSessionFactory();           
        }

        public ISession OpenSession()
        {
            return _sessionFactory.OpenSession();
        }
    }
}
