import {Component, Input, OnInit, Output} from '@angular/core';
import {PostDatabaseService} from '../../services/post-db.service';
import { PaginationInstance} from 'ngx-pagination';
import {PostDataService} from "../../services/post-data.service";
import {Sort, PageEvent} from '@angular/material';


@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  posts;
  @Output() i;
  selectedIndex: number;
  @Output() selectedPostIndex = 0;

  @Input() reverseDate() {
    this.posts.reverse();
  }

  layout = 'list';
  itemsPerPage = 7;

  sortedData;

  search = '';
  elasticError: string = '';

  bookmarkedPostsSelected = false;


  page: number = 1;
  public filter: string = '';
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1
  };

  constructor(private postService: PostDatabaseService, private postDataService: PostDataService) {

  }

  ngOnInit() {
    this.posts = this.postService.posts;


    this.postDataService.posts
      .subscribe((posts) => {
        this.posts = posts;
        /*this.sortedData = posts;*/
        // console.log(this.posts);
      });
    this.postService.postSaved
      .subscribe((posts) => {
        console.log('subscribe postSaved', posts);
        this.posts = posts;
      });
    this.postService.postIndexSelected
      .subscribe((index) => {
        console.log('postService index selected: ', index)
        this.selectedIndex = index;
      });
  }

  setSelectedPostIndex(index) {
    this.selectedPostIndex = index;
  }

  getBookmarkedPosts() {
    return null;
  }

 /* sortData(sort: Sort) {
    const data = this.posts.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title': return compare(a._source.title, b._source.title, isAsc);
        case 'date': return compare(+a._source.date, +b._source.date, isAsc);
        default: return 0;
      }
    });
  }

  // MatPaginator Inputs
  length = this.posts.length;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }*/
}

/*function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}*/



