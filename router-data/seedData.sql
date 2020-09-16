DELETE FROM routing.Stops;
DELETE FROM routing.Routes

DBCC CHECKIDENT ('routing.Routes', RESEED, 0);  

 INSERT INTO routing.Routes(DisplayName) VALUES ('Evergreen');
 INSERT INTO routing.Routes(DisplayName) VALUES ('Jay Street');
 INSERT INTO routing.Routes(DisplayName) VALUES ('GE Plot');
 INSERT INTO routing.Routes(DisplayName) VALUES ('Upper Union Street');

-- stops
INSERT INTO routing.Stops (RouteId,DisplayName,Latitude,Longitude) VALUES (1,'Smith',42.7943339,-73.9718487);
INSERT INTO routing.Stops (RouteId,DisplayName,Latitude,Longitude) VALUES (1,'Jones',42.7943179,-73.9760647);
INSERT INTO routing.Stops (RouteId,DisplayName,Latitude,Longitude) VALUES (1,'Patel',42.7988919,-73.974680);
INSERT INTO routing.Stops (RouteId,DisplayName,Latitude,Longitude) VALUES (1,'Wissel',42.8014499,-73.9772237);
INSERT INTO routing.Stops (RouteId,DisplayName,Latitude,Longitude) VALUES (1,'Anastasio',42.8018039,-73.9845197);

INSERT INTO routing.Stops (RouteId,DisplayName,Latitude,Longitude) VALUES (2,'Kline',42.8135184,-73.9423499);
INSERT INTO routing.Stops (RouteId,DisplayName,Latitude,Longitude) VALUES (2,'River',42.816155,-73.9410407);
INSERT INTO routing.Stops (RouteId,DisplayName,Latitude,Longitude) VALUES (2,'Slipper',42.817178,-73.9405147);
INSERT INTO routing.Stops (RouteId,DisplayName,Latitude,Longitude) VALUES (2,'Oleg',42.818052,-73.9399027);
INSERT INTO routing.Stops (RouteId,DisplayName,Latitude,Longitude) VALUES (2,'Fischer',42.81758,-73.9387117);
INSERT INTO routing.Stops (RouteId,DisplayName,Latitude,Longitude) VALUES (2,'Livermore',42.817108,-73.9373597);
INSERT INTO routing.Stops (RouteId,DisplayName,Latitude,Longitude) VALUES (2,'Labarre',42.816596,-73.9359217);
INSERT INTO routing.Stops (RouteId,DisplayName,Latitude,Longitude) VALUES (2,'LittleJohn',42.817619,-73.9387757);

INSERT INTO routing.Stops (RouteId,DisplayName,Latitude,Longitude) VALUES (3,'Sampson',42.819902,-73.9291817);
INSERT INTO routing.Stops (RouteId,DisplayName,Latitude,Longitude) VALUES (3,'Wilson',42.82253,-73.9258777);
INSERT INTO routing.Stops (RouteId,DisplayName,Latitude,Longitude) VALUES (3,'Sapienza',42.817509,-73.9282377);
INSERT INTO routing.Stops (RouteId,DisplayName,Latitude,Longitude) VALUES (3,'Cruz',42.81536,-73.9245897);


INSERT INTO routing.Stops (RouteId,DisplayName,Latitude,Longitude) VALUES (4,'Bondi',42.808104,-73.9152647);
INSERT INTO routing.Stops (RouteId,DisplayName,Latitude,Longitude) VALUES (4,'Southwind',42.806223,-73.9105337);
INSERT INTO routing.Stops (RouteId,DisplayName,Latitude,Longitude) VALUES (4,'Shepard',42.804239,-73.9054377);
INSERT INTO routing.Stops (RouteId,DisplayName,Latitude,Longitude) VALUES (4,'Diaz',42.799059,-73.8954707);
INSERT INTO routing.Stops (RouteId,DisplayName,Latitude,Longitude) VALUES (4,'Argall',42.80754,-73.8983057);
INSERT INTO routing.Stops (RouteId,DisplayName,Latitude,Longitude) VALUES (4,'Cutter',42.807627,-73.9044207);