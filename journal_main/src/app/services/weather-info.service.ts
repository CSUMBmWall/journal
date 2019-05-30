import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class WeatherInfoService {

  private readonly downloadURL = "http://localhost:3000/weatherInfo/";

  constructor(private http: HttpClient) { }

  public getWeather() {
    return this.http
      .get<any>(this.downloadURL);
  }

}
