import { StopFeature } from './stop-feature';

export class StopsRequest {
  type: string;
  features: StopFeature[];

  constructor() {
      this.type = 'features';
      this.features = [];
  }

  addFeature(feature: StopFeature): void {
      this.features.push(feature);
  }
}
