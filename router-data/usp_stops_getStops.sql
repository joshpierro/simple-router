-- EXEC routing.usp_stops_getStops 1

CREATE PROCEDURE routing.usp_stops_getStops
  @routeId INT
AS
  SELECT Id,RouteId,DisplayName,Latitude,Longitude
  FROM routing.Stops
  WHERE RouteId = @routeId
