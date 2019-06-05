import {EventEmitter, Injectable, OnInit, Output} from '@angular/core';
import {PostModel} from '../shared/models/post-model';
import {Http} from '@angular/http';
import { Client, SearchResponse } from 'elasticsearch';
import {PostDataService} from "./post-data.service";

@Injectable()
export class PostDatabaseService implements OnInit {
  postIndexSelected = new EventEmitter<number>();
  postSaved = new EventEmitter<any>();
  postStatus = new EventEmitter<String>();

  currentPost: PostModel;
  currentPostIndex: number;
  hasSaved = false;
  x: any;

  esError = new EventEmitter<String>();
  esSuccess = new EventEmitter<String>();


  private _client: Client;
  currentESIndex = null;
  posts: any[] = [];



  constructor(private http: Http, private postDataService: PostDataService) {
    if (!this._client) {
      this._connect();
    }
  }

  ngOnInit() {
    this.postDataService.selectedIndex
      .subscribe((index) => {
        this.currentESIndex = index;
      });
  }

  savePost(post) {
    this._client.index(post)
      .then((resp, error) => {
        if (resp.created) {
          this.postDataService.workingPostID.next(resp._id);
          this.esSuccess.emit('Record Created');
          this.postStatus.emit('Post "' + post.body.title + '" ' + resp.result);

          post.id = resp._id;
          this.getAllPostsDelayed();
        } else {
          console.log('savePost Error', error);
        }
      });
  }

  saveCurrentPost(post: PostModel) {
    this.currentPost = post;
  }

  // Elasticsearch Stuff
  private _connect() {
    this._client = new Client({
      host: 'http://localhost:9200',
    });
  }

  search(value): any {
    if (value) {
      return this._client.search({
        index: this.currentESIndex,
        q: `title:${value}`
      });
    } else {
      return Promise.resolve({});
    }
  }

  getAllPostsDelayed() {
    setTimeout(() => this.getAllPosts(), 1000);
  }

  getAllPosts(index?: string): any {
    if (index) { this.currentESIndex = index; }
    return this._client.search({
      index: this.currentESIndex,
      size: 500,
      body: {
        query: {
          'match_all': {}
        },
        'sort': { 'date': { 'order': 'desc' }}
      }
    }).then((resp) => {
      const hits = resp.hits.hits;
      this.postDataService.setSelectedPost(hits[0]);
      this.postDataService.setPosts(hits);
    });
  }

  // Get ID from component and delete it from posts array after confirmation from ES that post is deleted
  // No need to get all posts again
  // Same for saving new post -- add post to array, then update with id#
  deletePost(deletedPost) {
    this._client.delete({
      index: deletedPost._index,
      type: deletedPost._type,
      id: deletedPost._id,
    }).then((resp) => {
      this.postStatus.emit('Post ' + deletedPost._source.title + ' ' + resp.result);
      this.postDataService.isListHidden.next(false);
      this.getAllPostsDelayed();
    });
  }

  /*Uses object from elasticsearch:
  * { _index: string,
  *   _type: string,
  *   _id: string,
  *   _source: {
  *     title: string,
  *     date: string,
  *     body: string,
  *     markdownBody: string
  *     }
  * }                                **/
  updatePostDisplay(updatePost) {
    this._client.index(this.convertPostForES(updatePost))
      .then((resp) => {
      this.postStatus.emit('Post "' + updatePost._source.title + '" ' + resp.result + ' on ' + this.dateToString());
    });
  }

  /*Uses PostModel Object:
  * { index: string,
  *   type: string,
  *   id: string,
  *   body: {
  *     title: string,
  *     date: string,
  *     body: string,
  *     markdownBody: string
  *     }
  *  }
  **/
  updatePostEntry(updatePost) {
    this._client.index(updatePost)
      .then((resp) => {
        this.postStatus.emit('Post "' + updatePost.body.title + '" ' + resp.result + ' on ' + this.dateToString());
      });
  }

  dateToString() {

    var currentDate = new Date();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    var dateOfString = (("" + month).length < 2 ? "0" : "") + month + "/";
    dateOfString += (("" + day).length < 2 ? "0" : "") + day + "/";
    dateOfString += currentDate.getFullYear();
    dateOfString += " at " + currentDate.getHours() + ":"
      + currentDate.getMinutes() + ":"
      + currentDate.getSeconds();
    return dateOfString;
  }

  convertPostForES(post) {
    return new PostModel(
      post._index,
      post._type,
      post._id,
      post._source
    );
  }

  getIndices(index?: string) {
    let esIndices: string[] = [];
    return this._client.cat.indices({format: 'json', v : true})
      .then((indices) => {
        // console.log(indices);
        indices.forEach((index) => {
          if (index.index !== '.kibana') {
            esIndices.push(index.index);
          }
        }
        );
        this.postDataService.esIndices.next(esIndices);
        var firstIndex = '';
        if (index) { firstIndex = index; } else { firstIndex = esIndices[0]; }
        this.currentESIndex = firstIndex;
        this.postDataService.selectedIndex.next(firstIndex);

      })
      .catch(err => console.error(`Error connecting to the es client: ${err}`));
  }

  /*Checks that currentESIndex is set, loads all posts from that index when it is*/
  loadInitialData(index?: string) {
    const that = this;
    this.getIndices(index);
    var id = setInterval(checkForIndex, 250);
    function checkForIndex() {
      if (index) { that.currentESIndex = index;}
      if (that.currentESIndex) {
        clearInterval(id);
        that.getAllPosts();
      }
    }
  }

  bookmarkPost(bookmarkedPost) {

  }

}

