import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PostModel} from '../../shared/models/post-model';
import {WeatherModel} from '../../shared/models/weather.model';
import {PostDatabaseService} from '../../services/post-db.service';
import {FileUploadService} from '../../services/file-upload.service';

import { markdown } from 'markdown';
import {PostDataService} from "../../services/post-data.service";
import {FormBuilder, FormGroup} from '@angular/forms';

import {Converter} from "showdown/dist/showdown";
import {YoutubeInfoService} from '../../services/youtube-info.service';
import {UrlTitleService} from "../../services/url-title.service";
import {WeatherInfoService} from '../../services/weather-info.service';
import {HttpEventType} from '@angular/common/http';
import {YouTubeDataModel} from '../../shared/models/youTube-data.model';

/*const path = require('path');*/

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit, OnDestroy {
  options: FormGroup;
  hasSaved = false;

  elasticSuccess: string = '';
  elasticError: string = '';

  saveStatus = '';

  // for post and elasticsearch
  postIndex = 'journal';
  postType = 'journal_entry';
  weather = new WeatherModel();

  selectedFile = null;

  post = new PostModel ();

  youTubeID = '';
  imageID = '';
  htmlText = '';
  link = '';

  @ViewChild('postTitle') postTitle;
  @ViewChild('postBody') postBody;
  @ViewChild('postDate') postDate;


  constructor(private databaseService: PostDatabaseService, private postDataService: PostDataService, fb: FormBuilder,
              private ytInfoService: YoutubeInfoService, private urlTitleService: UrlTitleService,
              private weatherInfoService: WeatherInfoService, private fileUploadService: FileUploadService) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }
  ngOnInit() {
    this.post = this.initializeNewPost();

    // Want to make selected post this.post but it needs to be converted to a PostModel first
   /* this.postDataService.workingPostID
      .subscribe((id) => {
        this.post.id = id;
      });*/
    this.postDataService.selectedIndex
      .subscribe((index) => {
        this.post.index = index;
      });
    this.databaseService.esSuccess
      .subscribe((success) => {
        this.elasticSuccess = success;
      });
    this.databaseService.esError
      .subscribe((error) => {
        this.elasticError = error;
      });
    this.databaseService.postStatus
      .subscribe((status) => {
        this.saveStatus = status;
      });

    this.weatherInfoService.getWeather()
      .subscribe((weather_feed) => {
        // this.weather = JSON.parse(weather);
        this.weather.convertOpenWeatherData(JSON.parse(weather_feed));
        this.post.body.weather = this.weather;
    });

    /*this.getYouTubeInfo();*/
  }

  ngOnDestroy() {
    this.databaseService.saveCurrentPost(this.post);
  }

  onSavePost(form) {
    if (!this.post.id) {
      this.post.body.markdownBody = markdown.toHTML(this.post.body.body);
      this.databaseService.savePost(this.post);
    } else {
      this.databaseService.updatePostEntry(this.post);
    }
  }

  onClearPost() {
    this.post = new PostModel();
    // this.post = this.initializeNewPost();
    this.saveStatus = '';
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

  insertYouTubeLink() {
    this.ytInfoService.getYoutubeInfo(this.youTubeID)
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

            this.post.body.body += '<h4>' + ytTitle +
              '</h4><a href="http://www.youtube.com/watch?feature=player_embedded&v=' +
              ytID + '" target="_blank"><img src="' + thumbnail + '" \n' +
              'alt="\' + ytTitle + \'" width="240" height="180" border="10" /></a><br><br>' + '\n\n';

            this.post.body.youTube.push(new YouTubeDataModel(ytTitle, thumbnail, tag.description, tag.tags));
          }

        } else {
          this.post.body.body += 'NO ID found!!';
        }
      });
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  insertImageLink() {
    if (this.selectedFile === '') {
      return {err: 'No file Selected'};
    }

    this.fileUploadService.uploadImage(this.selectedFile)
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log('Upload Progress ' + Math.round(event.loaded / event.total * 100)  + "%");
        } else if (event.type === HttpEventType.Response) {
          const imgTag = '<img src="' + event.body.fileLoc + '" height="350px">\n';
          this.post.body.body += imgTag;
          this.post.body.img.push(event.body.fileLoc);
          this.selectedFile = '';
        }

      });
  }

  insertAnchor(url) {
    this.urlTitleService.getTitle(url.value)
      .subscribe(data => {
        this.post.body.body += '<a href="' + url.value + '" target="_blank">' +
          data.title + '</a>\n';
        this.addAnchorInfoToPost(url.value, data.title);
      });
  }

  addAnchorInfoToPost(url, title) {
    this.post.body.urlLink.push({
      title: title,
      url: url
    });
  }

  insertHTML(HTMLtext) {
    this.post.body.body += HTMLtext.value;
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
