import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class YoutubeInfoService {

  constructor(private http: HttpClient) { }

  private readonly infoURL = "http://localhost:3000/youTubeInfo/";

  public getYoutubeInfo(id) {
    return this.http.post<any>(this.infoURL, {id: id});
  }
}
