import { Component, OnInit } from '@angular/core';
import {FilePathService} from './filePath.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  insertImageLink(fileLoc) {

    const root = "C:\\fakepath\\";
    var imgTag = 'File Not Found\n';
    if (fileLoc.value) {
      const fileName = fileLoc.value.replace(root, '');
      imgTag = '<img src="assets\\images\\' + fileName + '" height="350px">\n';
    }
  }

}
