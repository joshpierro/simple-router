// angular
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange, MatSnackBar } from '@angular/material';

// third party
import esri = __esri;

// app
import { RoutesService } from '../routes/routes.service';
import { StopsService } from '../stops/stops.service';
import { Route } from '../models/route';
import { Stop } from '../models/stop';
import {
  ADD_ERROR,
  ADD_SUCCESS,
  ARCGIS_PORTAL_ITEM_ID,
  DELETE_ERROR,
  DELETE_SUCCESS,
  HTTP_ERROR_MESSAGE,
  MAP_CENTER,
  MAP_ZOOM,
  ROUTE_GRAPHIC_LAYER_TITLE,
  STOPS_GRAPHIC_LAYER_TITLE,
  STOP_SYMBOL,
} from '../configuration/app-settings.config';
import { Mapconfig } from '../models/map-config';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-router',
  templateUrl: './router.component.html',
  styleUrls: ['./router.component.css'],
})
export class RouterComponent implements OnInit {
  routes: Route[] = [];
  stops: Stop[] = [];
  directions: string[] = [];
  routesControl = new FormControl();
  mapConfig: Mapconfig;
  sketchTool: esri.Sketch;

  private stopsGraphicslayer: esri.GraphicsLayer;
  private routeGraphicslayer: esri.GraphicsLayer;
  private routeId: number;

  @ViewChild(MapComponent, { static: false }) map: MapComponent;

  constructor(
    private readonly routesService: RoutesService,
    private readonly stopsService: StopsService,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getRoutes();
    this.setMapConfig();
  }

  changeRoute(selection: MatSelectChange): void {
    this.cleargraphics();
    this.directions = [];
    this.routeId = selection.value;
    this.stopsService.getStopsByRoute(selection.value).subscribe(
      (r) => this.handleStops(r),
      () => this.handleError(HTTP_ERROR_MESSAGE)
    );
  }

  onMapReady(): void {
    this.createGraphicsLayers();
    // this.changeRoute({ value: 2, source: null });
  }

  route(): void {
    this.stopsService.routeStops(this.stops).subscribe((r) => {
      this.mapRoutes(r);
      this.setDirections(r);
    });
  }

  deleteStop(stop: Stop): void {
    this.stopsService.deleteStop(stop.stopId)
    .subscribe(
      () => this.handleSuccess(DELETE_SUCCESS),
      () => this.handleError(DELETE_ERROR),
      () => {
        this.cleargraphics();
        this.directions = [];
        const stops = this.stops.filter(s => s.stopId !== stop.stopId);
        this.handleStops(stops);
      }
      );
  }

  addStop(): void {
    this.sketchTool = this.map.createSketchTool(this.stopsGraphicslayer);
    this.sketchTool.availableCreateTools = ['point'];
    this.sketchTool.on('create', r => this.handleAddStop(r));
  }


  endSketch(): void {
    this.sketchTool = null;
    this.map.destroySketchTool();
  }

  private handleAddStop(event: esri.SketchCreateEvent): void {
    const geometry: {latitude: number, longitude: number} = event.graphic.geometry as any;

    const stop: Stop =  {
      latitude: geometry.latitude,
      longitude: geometry.longitude,
      displayName: 'New Stop',
      routeId: this.routeId
    };

    this.stopsService.createStop(stop).subscribe(
      (s) => {
        this.stops.push(s);
        this.handleStops(this.stops);
        this.endSketch();
        this.handleSuccess(ADD_SUCCESS);
      },
      () => this.handleError(ADD_ERROR)
    );

  }

  private mapRoutes(routes): void {
    routes.body.routes.features.forEach((f) => {
      const route = this.map.createLinegraphic(
        f.geometry.paths,
        routes.ROUTE_LINE_SYMBOL
      );
      this.routeGraphicslayer.add(route);
    });
    this.zoomToNewFeatures(this.routeGraphicslayer);
  }

  private setDirections(routes): void {
    routes.body.directions.forEach((d) => {
      if (!d.features) {
        return;
      }
      const directions = d.features.map((f) => f.attributes.text);
      this.directions = [...directions];
    });
  }

  private createGraphicsLayers(): void {
    this.stopsGraphicslayer = this.map.createGraphicsLayer(
      STOPS_GRAPHIC_LAYER_TITLE
    );
    this.routeGraphicslayer = this.map.createGraphicsLayer(
      ROUTE_GRAPHIC_LAYER_TITLE
    );
    this.map.addGraphicsLayer(this.stopsGraphicslayer);
    this.map.addGraphicsLayer(this.routeGraphicslayer);
  }

  private handleStops(stops: Stop[]): void {
    this.stops = stops;
    this.stops.forEach((s) => {
      const stopGraphic = this.map.createPointGraphicWithLatLong(
        [s.latitude, s.longitude],
        STOP_SYMBOL
      );
      this.stopsGraphicslayer.add(stopGraphic);
    });
    this.zoomToNewFeatures(this.stopsGraphicslayer);
  }

  private zoomToNewFeatures(graphicsLayer: esri.GraphicsLayer): void {
    const graphics: { items: any[] } = graphicsLayer.graphics as any;
    const extent = graphics.items.map((g) => g.geometry);
    this.map.view.goTo(extent);
  }

  private handleError(message: string): void {
    this.snackBar.open(message);
  }

  private handleSuccess(message: string): void {
    this.snackBar.open(message);
  }

  private getRoutes(): void {
    this.routesService.getRoutes().subscribe(
      (r) => (this.routes = r),
      () => this.handleError(HTTP_ERROR_MESSAGE)
    );
  }

  private cleargraphics(): void {
    this.stopsGraphicslayer.removeAll();
    this.routeGraphicslayer.removeAll();
  }

  private setMapConfig(): void {
    this.mapConfig = {
      center: MAP_CENTER,
      zoom: MAP_ZOOM,
      portalId: ARCGIS_PORTAL_ITEM_ID,
    };
  }
}
