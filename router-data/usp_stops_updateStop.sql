CREATE PROCEDURE [routing].[usp_stops_updateStop]
  @id INT,
  @routeId INT,
  @displayName VARCHAR(255),
  @latitude FLOAT,
  @longitude FLOAT 

AS
  UPDATE routing.Stops 
  SET RouteId = @routeId, DisplayName = @displayName, Latitude = @latitude, Longitude = @longitude
  WHERE Id = @id

SELECT TOP 1  Id,RouteId,DisplayName,Latitude,Longitude FROM routing.Stops WHERE Id = @Id
