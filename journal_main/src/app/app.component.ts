import {Component, OnInit} from '@angular/core';
import {PostDatabaseService} from './services/post-db.service';
import {PostDataService} from "./services/post-data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // using this as a hack to select my_lifes_blog index
  tempChooseIndex = "journal"

  constructor(private postDBService: PostDatabaseService) {}

  ngOnInit() {
    this.postDBService.loadInitialData(this.tempChooseIndex);
  }

}
