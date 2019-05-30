import { Component, OnInit, Inject } from '@angular/core';
import {PostDatabaseService} from "../../services/post-db.service";
import {PostDataService} from "../../services/post-data.service";
import {MatDialog} from '@angular/material';
import {ConfirmDeleteDialogComponent} from "../../shared/confirm-delete-dialog/confirm-delete-dialog.component";
import {FormBuilder, FormGroup} from '@angular/forms';
import {YoutubeInfoService} from '../../services/youtube-info.service';
import {PostModel} from '../../shared/models/post-model';
import {HttpEventType} from '@angular/common/http';
import {FileUploadService} from '../../services/file-upload.service';
import {UrlTitleService} from '../../services/url-title.service';
import {WeatherModel} from '../../shared/models/weather.model';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {
  selectedPost;
  statusMessage = 'Nothing to report';
  name: string;
  options: FormGroup;
  youTubeID = '';

  selectedFile = null;


  postIndex = 'my_lifes_blog';
  postType = 'journal_entry';

/*  post = new PostModel (
    this.postIndex,
    this.postType,
    null,
    {
      title: 'Title',
      date: new Date(),
      body: '',
      markdownBody: '',
      bookmarked: false,
    }
  );*/

  post = new PostModel();

  constructor(private postDBService: PostDatabaseService, private postDataService: PostDataService,
              public dialog: MatDialog, fb: FormBuilder, private ytInfoService: YoutubeInfoService,
              private fileUploadService: FileUploadService, private urlTitleService: UrlTitleService) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }

  ngOnInit() {
    this.postDataService.selectedPost
      .subscribe((post) => {
        this.selectedPost = post;
        }
      );

    this.postDBService.postStatus
      .subscribe((status) => {
        this.statusMessage = status;
      });
  }

  initializeNewPost() {
    return new PostModel (
      this.postIndex,
      this.postType,
      null,
      {
        title: 'Title',
        date: new Date(),
        body: '',
        markdownBody: '',
        bookmarked: false,
        strava: [],
        img: [],
        youTube: [],
        urlLink: [],
        weather: new WeatherModel()
      }
    );
  }

  onUpdatePost(selectedPost) {
    this.postDBService.updatePostDisplay(selectedPost);
  }

  onDeletePost(selectedPost) {

      let dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
        width: '250px',
        data: { name: selectedPost._source.title }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.postDBService.deletePost(selectedPost);
      }
      // console.log(result, 'The dialog was closed');
    });
  }

  insertYouTubeLink() {
    var ytinfo = this.ytInfoService.getYoutubeInfo(this.youTubeID)
      .subscribe(tag => {
        // const tag = data;

        if (tag) {
          const title = tag.title;
          var myRe = /=(.*)/g;
          var myArray = myRe.exec(this.youTubeID);

          if (myArray) {
            var ytID = myArray[1];
            var ytTitle = this.convert(title);
            const thumbnail =  tag.thumbnail.url;

            this.selectedPost._source.body += '<h4>' + ytTitle +
              '</h4><a href="http://www.youtube.com/watch?feature=player_embedded&v=' +
              ytID + '" target="_blank"><img src="' + thumbnail + '" \n' +
              'alt="\' + ytTitle + \'" width="240" height="180" border="10" /></a><br><br>' + '\n\n';
            this.addYouTubeInfoToPost(ytTitle, thumbnail, tag);
          }

        } else {
          this.selectedPost._source.body += 'NO ID found!!';
        }
      });
  }

  addYouTubeInfoToPost(title, thumb, allData) {
    this.selectedPost._source.youTube.push({
      title: title,
      thumbnail: thumb,
      description: allData.description,
      tags: allData.tags
    });
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  insertImageLink() {
    if (this.selectedFile === '' || this.selectedFile === null) {
      return {err: 'No file Selected'};
    }

    this.fileUploadService.uploadImage(this.selectedFile)
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log('Upload Progress ' + Math.round(event.loaded / event.total * 100)  + "%");
        } else if (event.type === HttpEventType.Response) {
          console.log(event.body.fileLoc);

          const imgTag = '<img src="' + event.body.fileLoc + '" height="350px">\n';
          this.selectedPost._source.body += imgTag;
          this.selectedPost._source.img.push(event.body.fileLoc);
          this.selectedFile = '';
        }

      });
  }

  insertAnchor(url) {
    var urlTitle = this.urlTitleService.getTitle(url.value)
      .subscribe(data => {
        this.selectedPost._source.body += '<a href="' + url.value + '" target="_blank">' +
          data.title + '</a>\n';
        this.addAnchorInfoToPost(url.value, data.title);
      });
  }

  addAnchorInfoToPost(url, title) {
    this.selectedPost._source.urlLink.push({
      title: title,
      url: url
    });
  }

  insertHTML(HTMLtext) {
    this.selectedPost._source.body += HTMLtext.value;
  }

  convert(str) {
    if (str) {
      str = str.replace(/&/g, "&amp;");
      str = str.replace(/>/g, "&gt;");
      str = str.replace(/</g, "&lt;");
      str = str.replace(/"/g, "&quot;");
      str = str.replace(/'/g, "&#039;");
    }
    return str;
  }
}



/*@Component({
  selector: 'app-dialog-overview-example-dialog-component',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}*/
