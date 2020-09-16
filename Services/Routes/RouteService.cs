using DataAccess;
using DataAccess.DTOs;
using Domain;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.Routes
{
    public class RouteService : Repository<RouteDTO>, IRouteService
    {
        public RouteService(IDbConnectionFactory factory) : base(factory)
        {
        }

        public async Task<IEnumerable<Route>> GetRoutes()
        {
            string getRoutesStoredProcedure = "routing.usp_routes_getRoutes";
            var routeDTOs = await Query(getRoutesStoredProcedure);
            return TransformRoutes(routeDTOs);
        }

        private IEnumerable<Route> TransformRoutes(IEnumerable<RouteDTO> routeDTOs)
        {
            var routes = routeDTOs
                .ToList()
                .Select(r => new Route { RouteId = r.Id, DisplayName = r.DisplayName });

            return routes;
        }
    }
}
