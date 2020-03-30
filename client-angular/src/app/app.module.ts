import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongsListComponent } from './components/songs-list/songs-list.component';
import { SongDetailsComponent } from './components/song-details/song-details.component';
import { AddSongComponent } from './components/add-song/add-song.component';
import { AddArtistComponent } from './components/add-artist/add-artist.component';

import { ToastrModule } from 'ngx-toastr';
import { ModalMsgComponent } from './components/modal-msg/modal-msg.component';

@NgModule({
  declarations: [
    AppComponent,
    SongsListComponent,
    SongDetailsComponent,
    AddSongComponent,
    AddArtistComponent,
    ModalMsgComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgbModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ ModalMsgComponent ]
})
export class AppModule { }
