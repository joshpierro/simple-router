using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Data.SqlClient;

namespace DataAccess
{
    public class ConnectionFactory : IDbConnectionFactory
    {

        public const string connectionName = "ROUTING";
        private readonly IConfiguration configuration;

        public ConnectionFactory(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public IDbConnection CreateConnection()
        {
            var connection =  new SqlConnection(configuration.GetConnectionString(connectionName));
            connection.Open();
            return connection;
        }
    }
}

