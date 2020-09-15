-- EXEC routing.usp_routes_deleteRoutes 1

CREATE PROCEDURE routing.usp_routes_deleteRoutes
  @routeId INT
AS
  DELETE FROM routing.Routes
  WHERE Id = @routeId
