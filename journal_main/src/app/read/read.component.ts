import { Component, OnInit } from '@angular/core';
import {PostDataService} from "../services/post-data.service";

@Component({
  selector: 'app-display',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  elasticError: string = '';
  isListHidden = false;

  constructor(private postDataService: PostDataService) { }

  ngOnInit() {
    this.postDataService.isListHidden
      .subscribe((hidden) => {
        this.isListHidden = hidden;
      });
  }

}

