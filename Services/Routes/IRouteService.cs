using Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Routes
{
    public interface IRouteService
    {
        Task<IEnumerable<Route>> GetRoutes();
    }
}
