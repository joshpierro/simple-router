-- EXEC routing.usp_routes_addRoute 'My Route' 

CREATE PROCEDURE routing.usp_routes_addRoute
  @displayName VARCHAR(255)
AS
  INSERT INTO routing.Routes
           (DisplayName)
     VALUES (@displayName)

SELECT SCOPE_IDENTITY()
