using Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Stops
{
    public interface IStopService
    {
        Task<IEnumerable<Stop>> GetStops(int routeId);
        Task<Stop> AddStop(Stop stop);
        Task<Stop> UpdateStop(Stop stop);
        void DeleteStop(int stopId);
      
    }
}
