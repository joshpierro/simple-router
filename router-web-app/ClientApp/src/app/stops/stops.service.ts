// angular
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

// third party
import { Observable } from 'rxjs';

// app
import { Stop } from '../models/stop';
import { StopFeature } from '../models/stops-request/stop-feature';
import { StopsRequest } from '../models/stops-request/stops-request';
import { ARC_GIS_ROUTING_URL, DEFAULT_SPATIAL_REFERENCE, ESRI_ACCESS_TOKEN } from '../configuration/app-settings.config';

@Injectable({
  providedIn: 'root',
})
export class StopsService {
  private APIUrl: string;
  private arcGISRoutingURL: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.APIUrl = `${baseUrl}api`;
    this.arcGISRoutingURL = ARC_GIS_ROUTING_URL;
  }

  routeStops(stops: Stop[]): Observable<any> {
    const stopsRequest = this.createStopsRequest(stops);

    const body = new HttpParams()
      .set('f', 'json')
      .set(`token`, ESRI_ACCESS_TOKEN)
      .set('stops', JSON.stringify(stopsRequest));

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post(this.arcGISRoutingURL, body.toString(), { headers, observe: 'response' });
  }

  getStopsByRoute(routeId: number): Observable<Stop[]> {
    const stopsAPI = `${this.APIUrl}/stopsbyrouteid?routeId=${routeId}`;
    return this.http.get<Stop[]>(stopsAPI);
  }

  deleteStop(stopId: number): Observable<string> {
    const deleteStopAPI = `${this.APIUrl}/deletestop?stopId=${stopId}`;
    return this.http.delete<string>(deleteStopAPI);
  }

  createStop(stop: Stop): Observable<Stop> {
    const addStopAPI = `${this.APIUrl}/addstop`;
    return this.http.post<Stop>(addStopAPI, stop);
  }

  private createStopsRequest(stops: Stop[]): StopsRequest {
    const stopsRequest = new StopsRequest();
    stops.forEach((s) => {
      const stopFeature: StopFeature = {
        geometry: { x: s.longitude, y: s.latitude, spatialReference: DEFAULT_SPATIAL_REFERENCE },
        attributes: {name: s.displayName}
      };
      stopsRequest.addFeature(stopFeature);
    });
    return stopsRequest;
  }

}
