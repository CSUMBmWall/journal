import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable()
export class UrlTitleService {
  private readonly downloadURL = "http://localhost:3000/webPageInfo/";

  constructor(private http: HttpClient) { }

  public getTitle(url) {
    return this.http
      .post<any>(this.downloadURL, { url: url});
  }


}
