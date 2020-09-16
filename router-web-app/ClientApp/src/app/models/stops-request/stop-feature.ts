export interface StopFeature {
  geometry: {x: number, y: number, spatialReference: {wkid: string}};
  attributes: { name: string };
}
