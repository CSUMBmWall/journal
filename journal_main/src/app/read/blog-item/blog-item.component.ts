import {Component, Input, OnInit} from '@angular/core';
import {PostDatabaseService} from '../../services/post-db.service';
import {PostDataService} from "../../services/post-data.service";


@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.css']
})
export class BlogItemComponent implements OnInit {
  @Input() post;
  @Input() i;
  @Input() selectedPostIndex;
  @Input() layout;
  @Input() itemsPerPage;

  highlightColor = '#add8e6';
  white = '#FFFFFF';
  greyBackground = "#c0c5c1";

  isSelected = null;

  currentPostSelected: number;

  constructor(private postService: PostDatabaseService, private postDataService: PostDataService) { }

  ngOnInit() {
    this.postService.postIndexSelected
      .subscribe((index) => {
        this.currentPostSelected = index;
      });
  }


  onSelected(i) {
    // this.postService.postSelected.emit(this.post);
    this.postDataService.setSelectedPost(this.post);
    /*this.postService.postIndexSelected.emit(i);
    this.isSelected = i;
    console.log(i);*/

  }
/*
  getColor(i) {
    if (this.i === this.selectedPostIndex) {
      return this.highlightColor;
    } else {
      return this.greyBackground;
    }
  }*/

  getBackgroundImg(i) {
    /*console.log('i', i, ' selectedPostIndex', this.selectedPostIndex);*/

    if (i === this.selectedPostIndex) {
      return "bkground";
    } else {
      return "bkgroundHighlight";
    }
  }

}
