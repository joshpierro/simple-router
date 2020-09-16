using Dapper;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace DataAccess
{
    public abstract class Repository<T>
    {
        private readonly IDbConnectionFactory connectionFactory;

        public Repository(IDbConnectionFactory connectionFactory)
        {
            this.connectionFactory = connectionFactory;
        }

        public async Task<IEnumerable<T>> Query(string query, DynamicParameters parameters = null)
        {
            IEnumerable<T> entities;

            using (var connection = connectionFactory.CreateConnection())
            {
               entities = await connection.QueryAsync<T>(query, parameters, commandType: CommandType.StoredProcedure);
            }

            return entities;
        }

        public async Task<T>Create(string query, DynamicParameters parameters = null)
        {
            T addEntity;
            using (var connection = connectionFactory.CreateConnection())
            {
                addEntity = await connection.QuerySingleAsync<T>(query, parameters, commandType: CommandType.StoredProcedure);
            }

            return addEntity;
        }

        public async Task<T> Update(string query, DynamicParameters parameters = null)
        {
            T updateEntity;
            using (var connection = connectionFactory.CreateConnection())
            {
                updateEntity = await connection.QuerySingleAsync<T>(query, parameters, commandType: CommandType.StoredProcedure);
            }

            return updateEntity;
        }

        public void Delete(string query, DynamicParameters parameters = null)
        {
            using (var connection = connectionFactory.CreateConnection())
            {
                connection.Execute(query, parameters, commandType: CommandType.StoredProcedure);
            }
        }


    }
}
