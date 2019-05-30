import { Component, OnInit } from '@angular/core';
import {PostDataService} from "../services/post-data.service";
import {PostDatabaseService} from "../services/post-db.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
/*
  indices = ['ng_blog', 'ng_blog_test'];
*/
  indices = [];
  selectedIndex = '';

  constructor(private postDBService: PostDatabaseService, private postDataService: PostDataService) { }

  ngOnInit() {
    this.postDataService.esIndices
      .subscribe((indices) => {
        this.indices = indices;
      });
    this.postDataService.selectedIndex
      .subscribe((currentIndex) => {
        this.selectedIndex = currentIndex;
      });
  }

  setIndex(index) {
    this.selectedIndex = index;
    this.postDataService.selectedIndex.next(index);
    this.postDBService.getAllPosts(index);
  }

}
