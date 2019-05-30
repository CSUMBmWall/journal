import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class FileUploadService {
  private readonly downloadURL = "http://localhost:3000/imageUpload/";

  constructor(private http: HttpClient) { }

  public uploadImage(img) {
    const fd = new FormData();
    fd.append('img', img, img.name);
    return this.http
      .post<any>(this.downloadURL, fd, {
        reportProgress: true,
        observe: 'events'
      });
  }
}
