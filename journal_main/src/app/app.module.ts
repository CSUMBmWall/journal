/*import {enableProdMode} from '@angular/core';

enableProdMode();*/

// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';

// Custom Components
import { HeaderComponent } from './header/header.component';
import { WriteComponent } from './write/write.component';
import { ReadComponent } from './read/read.component';
import { EntryFormComponent } from './write/entry-form/entry-form.component';
import { BlogListComponent } from './read/blog-list/blog-list.component';
import { BlogItemComponent } from './read/blog-item/blog-item.component';
import { BlogDetailComponent } from './read/blog-detail/blog-detail.component';
import { BlogEditComponent } from "./read/blog-edit/blog-edit.component";
import { ConfirmDeleteDialogComponent } from './shared/confirm-delete-dialog/confirm-delete-dialog.component';
import { TestWriteComponent } from './read/test-write/test-write.component';
import { YoutubeDlComponent } from './youtube-dl/youtube-dl.component';
import { HomeComponent } from './home/home.component';

// Directives
import { ClearInputDirective } from './clear-input.directive';

// Pipes
import { MarkdownPipe } from './shared/pipes/markdown.pipe';
import { SearchPipe } from './shared/pipes/search.pipe';
import { BookmarkedPipe } from './shared/pipes/bookmarked.pipe';

// Services
import {PostDatabaseService} from './services/post-db.service';
import { YoutubeInfoService } from './services/youtube-info.service';
import {PostDataService} from "./services/post-data.service";
import { YouTubeDlService } from './services/you-tube-dl.service';
import { MP3TagService } from "./services/MP3Tag.service";
import { UrlTitleService} from "./services/url-title.service";
import { WeatherInfoService } from './services/weather-info.service';
import { ImageService } from "./services/image.service";

// Modules
import {HttpModule} from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from "@angular/forms";

// External Imports
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {ngShowdown} from 'ng-showdown';
import {SlideshowModule} from 'ng-simple-slideshow';

// Angular Material
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { InsertComponent } from './write/insert/insert.component';
import {FileUploadService} from './services/file-upload.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from "@angular/material";

const appRoutes: Routes = [
  { path: '', redirectTo: '/write', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'write', component: EntryFormComponent },
  { path: 'read', component: ReadComponent },
  { path: 'test', component: TestWriteComponent },
  { path: 'youtubeDL', component: YoutubeDlComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WriteComponent,
    ReadComponent,
    EntryFormComponent,
    BlogListComponent,
    BlogItemComponent,
    BlogDetailComponent,
    ClearInputDirective,
    MarkdownPipe,
    BlogEditComponent,
    SearchPipe,
    ConfirmDeleteDialogComponent,
    TestWriteComponent,
    BookmarkedPipe,
    YoutubeDlComponent,
    InsertComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    HttpClientModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgxDatatableModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSortModule,
    MatTableModule,
    MatProgressSpinnerModule,
    SlideshowModule,
    MatDatepickerModule,
    MatNativeDateModule

  ],
  entryComponents: [ConfirmDeleteDialogComponent],
  providers: [PostDatabaseService, PostDataService, YoutubeInfoService,
    YouTubeDlService, MP3TagService, UrlTitleService, WeatherInfoService,
    FileUploadService, ImageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
