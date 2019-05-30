import { Component, OnInit } from '@angular/core';
import {YouTubeDlService} from '../services/you-tube-dl.service';
import {YoutubeInfoService} from "../services/youtube-info.service";
import {MP3TagService} from "../services/MP3Tag.service";
import {ID3Data } from "../shared/models/id3-data.model";

@Component({
  selector: 'app-youtube-dl',
  templateUrl: './youtube-dl.component.html',
  styleUrls: ['./youtube-dl.component.css']
})
export class YoutubeDlComponent implements OnInit {
  videoURL = '';
  folder = 'D:/Music/YouTube/';
  dlStatus: string;

  ytData: ID3Data = new ID3Data();

  currentFileTag: any = {
    artist: null,
    album: null,
    title: null,
    genre: null,
    image: null,
  };

  currentFileTagRaw: any = {
    TPE1: null,
    TALB: null,
    TIT2: null,
    TCON: null,
    APIC: null
  };

  setRawAttrs = function() {

  };

  /*thumbnails = ['default', 'high', 'maxres', 'medium', 'standard'];
  thumbnail = {
    url: null,
    width: null,
    height: null
  }*/

  constructor(private ytInfoSvc: YoutubeInfoService, private youTubeDlService: YouTubeDlService, private id3Service: MP3TagService) { }

  ngOnInit() {
    this.ytData.url = this.videoURL;
  }


  onDownload() {
    this.youTubeDlService.downloadVideo(this.folder, this.ytData)
      .subscribe(
        (resp) => this.dlStatus = resp.fileLoc);
  }

  getInfo() {
    this.ytInfoSvc.getYoutubeInfo(this.ytData.url)
      .subscribe(data => {
        // this.ytData = new ID3Data();
        // const results = data.items[0].snippet;
        if (data) {
          this.extractYTInfo(data);
        }
      });
  }

  // Use fields from Youtube Info Query
  extractYTInfo(rawData) {
    /*Things to do to tags
    1. remove special characters from title, description, and tags
    2. assign title and description to this.ytData.~
    3. Add title and description to tags
    4. Split all tags on ["-", ",", "from", "at", "by"]
    */

    // 1. remove special characters from title, description, and tags
    var title = this.removeSpecialChars(rawData.title);

    var description = this.removeSpecialChars(rawData.description);
    var ytTags = rawData.tags.map(tag => this.removeSpecialChars(tag));

    // 2. assign title, description, and thumbnails to this.ytData.~
    this.ytData.title = title;
    this.ytData.description = description;
    this.ytData.thumbnail = rawData.thumbnail.url;


    // 3. Add title and description to tags
    ytTags.push(title);
    ytTags.push(description);


    // 4. Split all tags on ["-", ",", "from", "at", "by"]
    var withSplit = [];
    ytTags.forEach(tag => {
      withSplit = withSplit.concat(tag.split(/[Aa]t|[Bb]y|[Ff]rom|\.|-|,/));
    });

    // remove all extra whitespace
    withSplit = withSplit.map(x => x.trim());

    // reassign to ytTags
    ytTags = withSplit;

    // remove all empty tags
    ytTags = ytTags.filter(Boolean);

    // remove all duplicate tags
    ytTags = this.uniq(ytTags);

    // set url to current URL
    ytTags.url = this.ytData.url;

    this.ytData.tags = ytTags;

  }

  setData(data) {
    console.log(data);
  }

  uniq(a) {
    return Array.from(new Set(a));
  }

  // remove " -- no replacement
  removeSpecialChars(str) {
    if (str === undefined) { return str; }
    str = str.replace(/["'`@#$%^&*()=+\[\]><\n:;]/g, "");
    str = str.trim();
    return str;
  }

  getTags() {
    this.id3Service.getTags(this.ytData.fileLoc)
      .subscribe(resp => {
        console.log(resp);
      });
  }

  setTags() {
    this.id3Service.setTags('D:\\Music\\YouTube\\Blaze Foley - YouTube - Clay Pigeons.mp3', this.ytData)
      .subscribe(resp => {
        console.log(resp);
      });
  }

}

export class VideoInfo  {
  fileloc: string;
  attrs = {};

  constructor(fileLoc, attrs) {
    this.fileloc = fileLoc;
    this.attrs = attrs;
  }


}

