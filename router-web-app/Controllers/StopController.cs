using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Services.Stops;

namespace router_web_app.Controllers
{
    [Route("api")]
    [ApiController]
    public class StopController : ControllerBase
    {
        private readonly IStopService service;

        public StopController(IStopService routeService)
        {
            this.service = routeService;
        }

        /// <summary>
        /// returns stops by routeid.
        /// </summary>
        /// <returns>A list of <c>Stop</c> values</returns>
        [HttpGet]
        [Route("stopsbyrouteid")]
        public async Task<ActionResult<IEnumerable<Stop>>> StopsByRouteId(int routeId)
        {
            try
            {
                IEnumerable<Stop> stops = await service.GetStops(routeId);
                return Ok(stops);
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception.Message);
                return BadRequest();
            }
        }

        /// <summary>
        /// Adds a stop.
        /// </summary>
        /// <returns>A new <c>Stop</c> object</returns>
        [HttpPost]
        [Route("addstop")]
        public async Task<ActionResult<Stop>> AddStop(Stop stop)
        {
            try
            {
                Stop newStop = await service.AddStop(stop);
                return Ok(newStop);
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception.Message);
                return BadRequest();
            }
        }

        /// <summary>
        /// updates a stop.
        /// </summary>
        /// <returns>An updated <c>Stop</c> object</returns>
        [HttpPut]
        [Route("updatestop")]
        public async Task<ActionResult<Stop>> UpdateStop(Stop stop)
        {
            try
            {
                Stop stopUpdate = await service.UpdateStop(stop);
                return Ok(stopUpdate);
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception.Message);
                return BadRequest();
            }
        }

        /// <summary>
        /// deletes a stop.
        /// </summary>
        /// <returns><c>No Content</c></returns>
        [HttpDelete]
        [Route("deletestop")]
        public ActionResult DeleteStop(int stopId)
        {
            try
            {
                service.DeleteStop(stopId);
                return Ok();
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception.Message);
                return BadRequest();
            }
        }

    }
}