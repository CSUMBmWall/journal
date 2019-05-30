import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PostModel} from '../../shared/models/post-model';
import {PostDatabaseService} from '../../services/post-db.service';

import { markdown } from 'markdown';
import {PostDataService} from "../../services/post-data.service";
import {FormBuilder, FormGroup} from '@angular/forms';

import {Converter} from "showdown/dist/showdown";
import {YoutubeInfoService} from '../../services/youtube-info.service';
import {UrlTitleService} from "../../services/url-title.service";
import { ImageService } from "../../services/image.service";

 @Component({
   selector: 'app-test-write',
   templateUrl: './test-write.component.html',
   styleUrls: ['./test-write.component.css']
 })
 export class TestWriteComponent implements OnInit, OnDestroy {
   images = [
     "http://localhost:3000/imageUploads/20190101_081526.jpg",
     "http://localhost:3000/imageUploads/20190101_081513.jpg",
     "http://localhost:3000/imageUploads/DSC_0904.JPG",
     "http://localhost:3000/imageUploads/DSC_0810.JPG",
     "http://localhost:3000/imageUploads/DSC_0818.JPG",
     "http://localhost:3000/imageUploads/DSC_0833.JPG",
     "http://localhost:3000/imageUploads/DSC_0838.JPG",
     "http://localhost:3000/imageUploads/DSC_0850.JPG",
     "http://localhost:3000/imageUploads/DSC_0865.JPG",
     "http://localhost:3000/imageUploads/DSC_0866.JPG",
     "http://localhost:3000/imageUploads/DSC_0867.JPG",
     "http://localhost:3000/imageUploads/DSC_0868.JPG",
     "http://localhost:3000/imageUploads/DSC_0869.JPG",
     "http://localhost:3000/imageUploads/DSC_0870.JPG",
     "http://localhost:3000/imageUploads/DSC_0899.JPG",
     "http://localhost:3000/imageUploads/DSC_0900.JPG",
     "http://localhost:3000/imageUploads/DSC_0901.JPG",
     "http://localhost:3000/imageUploads/DSC_0902.JPG"
   ]
   options: FormGroup;
   hasSaved = false;

   ytInfo = null;

   titlePlaceholder = 'Insert clever title';
   bodyPlaceholder = 'Brilliant reflection or observation here...';

   elasticSuccess: string = '';
   elasticError: string = '';

   saveStatus = '';

   // for post and elasticsearch
   postIndex = 'my_lifes_blog';
   postType = 'journal_entry';

   post = new PostModel (
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
   );

   youTubeID = 'https://www.youtube.com/watch?v=uM3YROq_cLY';
   imageID = '';

   @ViewChild('postTitle') postTitle;
   @ViewChild('postBody') postBody;
   @ViewChild('postDate') postDate;


   constructor(private databaseService: PostDatabaseService, private postDataService: PostDataService, fb: FormBuilder,
               private ytService: YoutubeInfoService, private urlTitleService: UrlTitleService,
               private imageService: ImageService) {
     this.options = fb.group({
       hideRequired: false,
       floatLabel: 'auto',
     });
   }
   ngOnInit() {
     this.postDataService.workingPostID
       .subscribe((id) => {
         this.post.id = id;
       });
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
     this.imageService.images
       .subscribe((status) => {
         this.saveStatus = status;
       });

     /*this.getYouTubeInfo();*/
   }

   ngOnDestroy() {
     this.databaseService.saveCurrentPost(this.post);
   }

   onSavePost(form) {
     if (!this.post.id) {
       this.post.body.markdownBody = markdown.toHTML(this.post.body.body);
       console.log('save', this.post);
       this.databaseService.savePost(this.post);
     } else {
       console.log('update', this.post);
       this.databaseService.updatePostEntry(this.post);
     }
   }

   onClearPost() {
     this.post = new PostModel (
       this.postIndex,
       this.postType,
       null,
       {
         title: 'Title',
         date: new Date(),
         body: '',
         markdownBody: ''
       }
     );

     this.saveStatus = '';
   }

   /*insertYouTubeLink() {
     var ytinfo = this.ytService.getYoutubeInfo(this.youTubeID)
       .subscribe(data => {
         var myRe = /=(.*)/g;
         var myArray = myRe.exec(this.youTubeID);

         if (myArray) {
           var ytID = myArray[1];
           var ytTitle = this.convert(data.title);

           this.post.body.body += '<h3>' + ytTitle +
             '</h3><a href="http://www.youtube.com/watch?feature=player_embedded&v=' +
             ytID + '\n' + '" target="_blank"><img src="' + data.thumbnail_url + '" \n' +
             'alt="\' + ytTitle + \'" width="240" height="180" border="10" /></a><br><br>' + '\n\n';
         } else {
           this.post.body.body += 'NO ID found!!';
         }
       });
   }*/

   insertYouTubeLink() {
     var ytinfo = this.ytService.getYoutubeInfo(this.youTubeID)
       .subscribe(data => {
         const tag = data.items[0].snippet;
         if (tag) {
           const title = tag.title;
           var myRe = /=(.*)/g;
           var myArray = myRe.exec(this.youTubeID);

           if (myArray) {
             var ytID = myArray[1];
             var ytTitle = this.convert(title);
             const thumbnail =  tag.thumbnails.default.url;

             this.post.body.body += '<h3>' + ytTitle +
               '</h3><a href="http://www.youtube.com/watch?feature=player_embedded&v=' +
               ytID + '\n' + '" target="_blank"><img src="' + thumbnail + '" \n' +
               'alt="\' + ytTitle + \'" width="240" height="180" border="10" /></a><br><br>' + '\n\n';
           }

         } else {
           this.post.body.body += 'NO ID found!!';
         }
       });
   }
   insertImageLink(imgLoc) {
     const root = "C:\\fakepath\\";
     var imgTag = 'File Not Found\n';
     if(imgLoc.value) {
       const fileName = imgLoc.value.replace(root, '');
       imgTag = '<img src="assets\\images\\' + fileName + '" height="350px">\n';
     }
     this.post.body.body += imgTag;
   }

   insertAnchor(url) {
     // this.getTitle(url); Need service and call to backend for this to work
     // console.log(this.urlTitleService.getTitle(url));
     var urlTitle = this.urlTitleService.getTitle(url.value)
       .subscribe(data => {
         this.post.body.body += '<a href="' + url.value + '" target="_blank">' +
           data.title + '</a>\n';
       });
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

   getTitle = (url) => {
     return fetch(`https://crossorigin.me/${url}`)
       .then((response) => response.text())
       .then((html) => {
         const doc = new DOMParser().parseFromString(html, "text/html");
         const title = doc.querySelectorAll('title')[0];
         return title.innerText;
       });
   }
}
