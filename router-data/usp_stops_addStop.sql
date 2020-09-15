-- EXEC routing.usp_stops_addStop @routeId=1,@displayName = 'cat', @latitude = 42.24, @longitude = 76.23

CREATE PROCEDURE routing.usp_stops_addStop
  @routeId INT,
  @displayName VARCHAR(25),
  @latitude FLOAT,
  @longitude FLOAT 
AS
  INSERT INTO routing.Stops (RouteId,DisplayName,Latitude,Longitude)
  VALUES (@routeId,@displayName,@latitude,@longitude)
  
SELECT SCOPE_IDENTITY()
