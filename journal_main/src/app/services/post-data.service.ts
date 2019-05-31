import { Injectable, OnInit } from '@angular/core';
import { PostModel} from "../shared/models/post-model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class PostDataService implements OnInit {
  _posts: PostModel[] = [];
  posts: BehaviorSubject<PostModel[]> = new BehaviorSubject<PostModel[]>([]);
  selectedPost: BehaviorSubject<PostModel> = new BehaviorSubject<PostModel>(null);
  selectedPostIndex: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  isListHidden: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  esIndices: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  selectedIndex: BehaviorSubject<string> = new BehaviorSubject<string>('');

  workingpost: PostModel;
  workingPostID: BehaviorSubject<string> = new BehaviorSubject<string>('');

  readLayout: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  ngOnInit() {
  }

  toggleHideList(hideList: boolean) {
    this.isListHidden.next(hideList);
  }

  setSelectedPost(post) {
    this.selectedPost.next(post);
  }

  setPosts(posts) {
    this._posts = posts;
    this.posts.next(posts);
  }

  addWorkingPost(post) {
    this._posts.concat(post);
    this._posts = this.sortByDate(this._posts);
    console.log('add working', Object.assign({}, this._posts));
    this.posts.next(this._posts);
  }

  sortByDate(posts) {
    posts = posts.sort(function (a, b) {
        return a._source.date - b._source.date;
    });
    return posts;
  }

}
