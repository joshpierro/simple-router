using System.Data;

namespace DataAccess
{
    interface IDbConnectionFactory
    {
        IDbConnection CreateConnection();
    }
}
