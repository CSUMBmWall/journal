import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable()
export class MP3TagService {
  constructor(private http: HttpClient) { }
  public getTags(fileLoc): Observable<any> {
    var  URL = "http://localhost:3000/ID3Tags/";
    var TESTLOC = "";

    httpParams = httpParams.append('fileLoc', TESTLOC);
    return this.http
      .post<any>(URL, { fileLoc: TESTLOC });
  }

  public setTags(fileLoc, ytVideoInfo): Observable<any> {
    var  URL = "http://localhost:3000/api/setID3Tags/";
    return this.http.post<any>(URL, { ytVideoInfo: 'ytvideoInfo' });
  }


}
