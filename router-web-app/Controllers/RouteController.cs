using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Services.Routes;

namespace router_web_app.Controllers
{
    [Route("api")]
    [ApiController]
    public class RouteController : ControllerBase
    {
        private readonly IRouteService service;

        public RouteController(IRouteService routeService)
        {
            this.service = routeService;
        }

        /// <summary>
        /// returns all Routes.
        /// </summary>
        /// <returns>A list of <c>AccessControlValue</c> values</returns>
        [HttpGet]
        [HttpPost]
        [Route("routes")]
        public async Task<ActionResult<IEnumerable<Route>>> Routes()
        {
            try
            {
                IEnumerable<Route> routes = await service.GetRoutes();
                return Ok(routes);
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception.Message);
                return BadRequest();
            }
        }

    }
}