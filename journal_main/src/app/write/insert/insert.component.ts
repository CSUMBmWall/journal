import { Component, OnInit } from '@angular/core';
import {FilePathService} from './filePath.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {

/*
  constructor(private filePathService: FilePathService) { }
*/
  constructor() { }

  ngOnInit() {
  }

  insertImageLink(fileLoc) {
    // console.log(path.dirname(imgLoc.value));

    // this.filePathService.getFilePath(fileLoc);

    const root = "C:\\fakepath\\";
    var imgTag = 'File Not Found\n';
    if (fileLoc.value) {
      const fileName = fileLoc.value.replace(root, '');
      imgTag = '<img src="assets\\images\\' + fileName + '" height="350px">\n';
    }
    // this.post.body.body += imgTag;
  }

}
