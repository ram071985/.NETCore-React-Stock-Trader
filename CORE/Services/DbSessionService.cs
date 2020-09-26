﻿using System;
using System.Reflection;
using NHibernate;
using NHibernate.Cfg;
using NHibernate.Dialect;

namespace CORE.Services
{

    public interface IDbSessionService
    {
        ICreateSessionService OpenSession();
    }
    public class DbSessionService
    {

        private readonly ISessionFactory _sessionFactory;

        public DbSessionService()
        {
            var config = new Configuration();

            config.DataBaseIntegration(x =>
            {
                x.ConnectionString = "Host=otto.db.elephantsql.com;Database=aemtrcbd;Username=aemtrcbd;Password=yzAmcOsG2OPU0E5e2LNS9JoG_KzZcgWw;";
                x.Dialect<PostgreSQLDialect>();
            });

            config.AddAssembly(Assembly.GetExecutingAssembly());

            _sessionFactory = config.BuildSessionFactory();
        }
    }
}
