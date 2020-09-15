
DECLARE @Schema VARCHAR(255)
SET @Schema = 'routing'

DECLARE @Table VARCHAR(255)
SET @Table = 'Stops'

IF (EXISTS (SELECT *
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = @Schema AND TABLE_NAME = @Table))
   BEGIN
  DROP TABLE routing.Stops
END
  BEGIN
  CREATE TABLE routing.Stops
  (
    Id INT NOT NULL IDENTITY PRIMARY KEY,
    RouteId INT NOT NULL,
    DisplayName VARCHAR(25),
    Latitude FLOAT,
    Longitude FLOAT,
    CONSTRAINT FK_Stops_Routes FOREIGN KEY (RouteId) REFERENCES routing.Routes (Id)
  )
END