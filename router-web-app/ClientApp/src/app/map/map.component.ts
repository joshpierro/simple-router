// angular
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';

// 3rd Party
import { loadModules, setDefaultOptions } from 'esri-loader';
import { MAP_ERROR} from '../configuration/app-settings.config';
import { Mapconfig } from '../models/map-config';
import { MapSymbol } from '../models/map-symbol';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, OnDestroy {
  map: __esri.WebMap;
  showLoadingIcon: boolean;
  view: __esri.MapView;

  private esriGraphicsLayer: __esri.GraphicsLayerConstructor;
  private esriPoint: __esri.PointConstructor;
  private esriGraphic: __esri.GraphicConstructor;
  private esriLine: __esri.PolylineConstructor;
  private esriSketch: __esri.SketchConstructor;
  private sketchTool: __esri.Sketch;

  @ViewChild('mapView', { static: true }) private mapViewEl: ElementRef;
  @Input() mapConfig: Mapconfig;
  @Output() mapLoadedEvent = new EventEmitter<boolean>();
  @Output() mapErrorEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    this.initializeMap();
  }

  ngOnDestroy() {
    this.destroyMap();
  }

  createGraphicsLayer(title: string): __esri.GraphicsLayer {
    return new this.esriGraphicsLayer({ title });
  }

  addGraphicsLayer(graphicsLayer: __esri.GraphicsLayer): void {
    this.map.add(graphicsLayer);
  }

  removeGraphicsLayer(graphicsLayer: __esri.GraphicsLayer): void {
    this.map.remove(graphicsLayer);
  }

  createPointGraphicWithLatLong(
    coordinates: number[],
    symbol: MapSymbol
  ): __esri.Graphic {
    const [latitude, longitude] = coordinates;

    const geometry = new this.esriPoint({
      longitude,
      latitude
    });

    const pointGraphic = new this.esriGraphic({
      geometry,
      symbol
    });

    return pointGraphic;
  }

  createLinegraphic(paths: number[][][], symbol: MapSymbol): __esri.Graphic {

    const geometry = new this.esriLine({paths});

    const lineGraphic = new this.esriGraphic({
      geometry,
      symbol
    });

    return lineGraphic;
  }

  createSketchTool(layer: __esri.GraphicsLayer): __esri.Sketch {
    this.sketchTool = new this.esriSketch({
      layer,
      view: this.view,
      creationMode: 'update'
    });
    this.view.ui.add(this.sketchTool, 'top-right');
    return this.sketchTool;
  }

  destroySketchTool(): void {
    this.view.ui.remove(this.sketchTool);
    this.sketchTool.destroy();
    this.sketchTool = null;
  }

  private async initializeMap(): Promise<void> {
    try {
      setDefaultOptions({ css: true });
      this.showLoadingIcon = true;
      const [esriWebMap, esriMapView, esriGraphicslayer, esriPoint, esriLine, esriGraphic, esriSketch] = await loadModules([
        'esri/WebMap',
        'esri/views/MapView',
        'esri/layers/GraphicsLayer',
        'esri/geometry/Point',
        'esri/geometry/Polyline',
        'esri/Graphic',
        'esri/widgets/Sketch'
      ]);

      this.esriGraphicsLayer = esriGraphicslayer;
      this.esriPoint = esriPoint;
      this.esriGraphic = esriGraphic;
      this.esriLine = esriLine;
      this.esriSketch = esriSketch;

      const container = this.mapViewEl.nativeElement;
      const center = this.mapConfig.center;
      const zoom = this.mapConfig.zoom;
      const id = this.mapConfig.portalId;

      const map = new esriWebMap({ portalItem: { id } });

      map.load().then(async (wm) => {
        this.map = wm;
        this.view = new esriMapView({ map, container, center, zoom });
        await this.view.when();
        this.showLoadingIcon = false;
        this.mapLoadedEvent.emit(true);
      });
    } catch (error) {
      this.mapErrorEvent.emit(MAP_ERROR);
    }
  }

  private destroyMap(): void {
    if (this.view) {
      this.view.container = null;
    }
  }
}
