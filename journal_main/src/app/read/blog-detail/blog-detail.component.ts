import { Component, OnInit } from '@angular/core';
import {PostModel} from '../../shared/models/post-model';
import {PostDatabaseService} from '../../services/post-db.service';
import {PostDataService} from "../../services/post-data.service";
import {MatDialog} from '@angular/material';
import {ConfirmDeleteDialogComponent} from "../../shared/confirm-delete-dialog/confirm-delete-dialog.component";


@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  selectedPost;
  // selectedPost: PostModel;
  statusMessage = 'Nothing to report';
  listIsHidden: boolean = false;

  constructor(private postDBService: PostDatabaseService,
              private postDataService: PostDataService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.postDataService.selectedPost
      .subscribe(
        (post) => {
          this.selectedPost = post;
        }
      );
    this.postDBService.postStatus
      .subscribe(
        (status) => {
          this.statusMessage = status;
        }
      );
    this.postDataService.isListHidden
      .subscribe(
        (isHidden) => {
          this.listIsHidden = isHidden;
        }
      );
  }

  onHideList() {
    this.listIsHidden = !this.listIsHidden;
    this.postDataService.toggleHideList(this.listIsHidden);
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

  onBookmarkPost(bookmarkedPost) {
    if (bookmarkedPost._source.bookmarked) {
      bookmarkedPost._source.bookmarked = false;
    } else {
      bookmarkedPost._source.bookmarked = true;
    }
    this.postDBService.updatePostDisplay(bookmarkedPost);
  }

}
