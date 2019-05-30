import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable()
export class MP3TagService {
  constructor(private http: HttpClient) { }
  public getTags(fileLoc): Observable<any> {
    var  URL = "http://localhost:3000/ID3Tags/";
    /*var TESTLOC = "D:\\Music\\Jerry Lee Lewis\\Jerry Lee Lewis - Anthology (All Killer No Filler) Disc 1 - Crazy Arms.mp3"*/
    var TESTLOC = "C:\\Users\\Matt\\Downloads\\Music\\Van Morrison\\Van Morrison - " +
      "It's Too Late To Stop Now Disc 1 - Caravan (Live At The Troubadour).mp3";
/*    let httpParams = new HttpParams();

    httpParams = httpParams.append('fileLoc', TESTLOC);*/
    /*console.log('youtube-dl.svc.options', {params: ytVideoInfo});*/
    return this.http
      .post<any>(URL, { fileLoc: TESTLOC });
  }

  /*public setTags(fileLoc, ytVideoInfo): Observable<any> {
    var  URL = "http://localhost:3000/api/setID3Tags/";
    let httpParams = new HttpParams();
    Object.keys(ytVideoInfo).forEach(function (key) {
      httpParams = httpParams.append(key, ytVideoInfo[key]);
    });
    /!*console.log('youtube-dl.svc.options', {params: ytVideoInfo});*!/
    return this.http
      .get<any>(URL, { params: httpParams })
  }*/

  public setTags(fileLoc, ytVideoInfo): Observable<any> {
    var  URL = "http://localhost:3000/api/setID3Tags/";
    return this.http.post<any>(URL, { ytVideoInfo: 'ytvideoInfo' });
  }


}
