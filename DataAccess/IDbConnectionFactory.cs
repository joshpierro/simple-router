using System.Data;

namespace DataAccess
{
    public interface IDbConnectionFactory
    {
        IDbConnection CreateConnection();
    }
}
