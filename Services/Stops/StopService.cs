
using Dapper;
using DataAccess;
using DataAccess.DTOs;
using Domain;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.Stops
{
    public class StopService : Repository<StopDTO>, IStopService
    {
        public StopService(IDbConnectionFactory factory) : base(factory)
        {
        }

        public async Task<Stop> AddStop(Stop stop)
        {
            string addStopStoredProcedure = "routing.usp_stops_addStop";
            var parameters = new DynamicParameters();
            parameters.Add("@routeId", stop.RouteId);
            parameters.Add("@displayName", stop.DisplayName);
            parameters.Add("@latitude", stop.Latitude);
            parameters.Add("@longitude", stop.Longitude);
            StopDTO newStop = await Create(addStopStoredProcedure, parameters);

            return new Stop() { StopId = newStop.Id, DisplayName = newStop.DisplayName, RouteId = newStop.RouteId, Latitude = newStop.Latitude, Longitude = newStop.Longitude };
        }

        public async Task<Stop> UpdateStop(Stop stop)
        {
            string updateStopStoredProcedure = "routing.usp_stops_updateStop";
            var parameters = new DynamicParameters();
            parameters.Add("@id", stop.StopId);
            parameters.Add("@routeId", stop.RouteId);
            parameters.Add("@displayName", stop.DisplayName);
            parameters.Add("@latitude", stop.Latitude);
            parameters.Add("@longitude", stop.Longitude);
            StopDTO newStop = await Update(updateStopStoredProcedure, parameters);

            return new Stop() { StopId = newStop.Id, DisplayName = newStop.DisplayName, RouteId = newStop.RouteId, Latitude = newStop.Latitude, Longitude = newStop.Longitude };

        }

        public void DeleteStop(int stopId)
        {
            string deleteStopStoredProcedure = "routing.usp_stops_deleteStop";
            var parameters = new DynamicParameters();
            parameters.Add("@stopId", stopId);
            Delete(deleteStopStoredProcedure, parameters);
        }

        public async Task<IEnumerable<Stop>> GetStops(int routeId)
        {
            string getStopsStoredProcedure = "routing.usp_stops_getStops";
            var parameters = new DynamicParameters();
            parameters.Add("@routeId", routeId);
            var stopDTOs = await Query(getStopsStoredProcedure, parameters);
            return TransformStops(stopDTOs);
        }

        private IEnumerable<Stop> TransformStops(IEnumerable<StopDTO> stopDTOs)
        {
            IEnumerable<Stop> stops =
                stopDTOs
                .ToList()
                .Select(s => new Stop { StopId = s.Id, RouteId = s.Id, DisplayName = s.DisplayName, Latitude = s.Latitude, Longitude = s.Longitude });
            
            return stops;
        }
    }
}
