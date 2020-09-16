// angular
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// third party
import { Observable } from 'rxjs/internal/Observable';
import { Route } from '../models/route';

// app

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  private APIUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.APIUrl = `${baseUrl}api`;
  }

  getRoutes(): Observable<Route[]> {
    const routesAPI = `${this.APIUrl}/routes`;
    return this.http.get<Route[]>(routesAPI);
  }
}
