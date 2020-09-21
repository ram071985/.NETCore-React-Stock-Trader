using System;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace Core.DataAccess
{
    public interface IDbConnection
    {
        NpgsqlConnection GetConnection();
    }
    public class DbConnection : IDbConnection
    {
        private string _databaseUserName;
        private string _databasePassword;
        private string _databaseHost;
        private string _databaseName;

        public DbConnection(IConfiguration configuration)
        {
            _databaseUserName = configuration["Database:Username"];
            _databasePassword = configuration["Database:Password"];
            _databaseHost = configuration["Databse:Host"];
            _databaseName = configuration["Database:Name"];
        }

        public NpgsqlConnection GetConnection()
        {
            var connString = "Host=" + _databaseHost + ";Username =" + _databaseUserName + ";Password=" + _databasePassword + ";Database=" + _databaseName;

            var conn = new NpgsqlConnection(connString);
            conn.Open();
            return conn;
        }
    }

        
}

