import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ImageService {
  // images: string[] = [];
  images = new EventEmitter<any>();
  constructor(private http: HttpClient) { }

  public getImages(): Observable<any> {
    var  URL = "http://localhost:3000/imageSearch/";
    // console.log(this.http
    //   .get<any>(URL));
    return this.http.get<any>(URL);
  }


}
