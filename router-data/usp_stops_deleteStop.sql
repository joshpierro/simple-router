-- EXEC routing.usp_stops_deleteStop 4

CREATE PROCEDURE routing.usp_stops_deleteStop
  @stopId INT
AS
  DELETE FROM routing.Stops
  WHERE Id = @stopId
