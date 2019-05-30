import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class FilePathService {

  constructor(private http: HttpClient) { }

  private readonly infoURL = "http://localhost:3000/api/insert/";


  public getFilePath(fileLoc) {
    const options = fileLoc ?
      { params: new HttpParams().set('fileLoc', fileLoc) } : {};

    return this.http.get<any>(this.infoURL, options);
  }

}
