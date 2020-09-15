-- EXEC routing.usp_routes_getRoutes

CREATE PROCEDURE routing.usp_routes_getRoutes
AS
  SELECT Id,DisplayName
  FROM routing.Routes

