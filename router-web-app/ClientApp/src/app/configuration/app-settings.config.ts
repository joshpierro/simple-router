import { MapSymbol } from '../models/map-symbol';

export const HTTP_ERROR_MESSAGE = 'There was an error getting your data';
export const MAP_CENTER = [-73.935024, 42.8009036];
export const MAP_ZOOM = 14;
export const MAP_ERROR = 'There was an issue loading your map';
export const ARCGIS_PORTAL_ITEM_ID = 'e691172598f04ea8881cd2a4adaa45ba';
export const STOPS_GRAPHIC_LAYER_TITLE = 'Stops';
export const STOP_SYMBOL: MapSymbol = {
  type: 'simple-marker',
  color: '#00FF00',
  outline: {
    color: '#000000',
    width: 1,
  },
};
export const ESRI_ACCESS_TOKEN =
  'WdLdLSzG7FVHhiJwZcrjr9bzGAj77gyYSrGZwW3oxW6MOEt8GhnA_ik8k9kszQtw5qVw9HwKeKIGpAn3EhpeNdNLlnV4c0Sl5oJDAYfeYJCedooozcMJ7hguzUcDCKrAfydv2PsujIgPTNL7x5Ftqg..';
export const DEFAULT_SPATIAL_REFERENCE = {
  wkid: '4326',
};

export const ROUTE_GRAPHIC_LAYER_TITLE = 'Stops Route';
export const ARC_GIS_ROUTING_URL = 'https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve';
export const ROUTE_LINE_SYMBOL: MapSymbol = {
    type: 'simple-line',
    color: '#0ff',
    width: 4
  };

export const DELETE_SUCCESS = 'Successfully deleted stop!';
export const DELETE_ERROR = 'Failed to delete stop!';

export const ADD_SUCCESS = 'Successfully added stop!';
export const ADD_ERROR = 'Failed to add stop!';
