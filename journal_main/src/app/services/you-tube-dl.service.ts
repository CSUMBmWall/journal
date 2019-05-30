import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from "rxjs/Observable";

@Injectable()
export class YouTubeDlService {
  private readonly downloadURL = "http://localhost:3000/youTubeDL/";

  constructor(private http: HttpClient) { }

  public downloadVideo(fileLoc, ytVideoInfo): Observable<any> {
    return this.http
      .post<any>(this.downloadURL, {
        fileLoc: fileLoc,
        ytVideoInfo: ytVideoInfo
      });
  }

}
