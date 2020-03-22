import { Component, OnInit } from "@angular/core";
import { Apollo, QueryRef } from "apollo-angular";
import { NgxSpinnerService } from "ngx-spinner";

import { getSongsQuery, getSongQuery } from "../../queries/queries";

@Component({
  selector: "app-songs-list",
  templateUrl: "./songs-list.component.html",
  styleUrls: ["./songs-list.component.css"]
})
export class SongsListComponent implements OnInit {
  Songs: any[] = [];
  SelectedSong: any;
  Loading: boolean;
  Error: any;
  private query: QueryRef<any>;

  constructor(private apollo: Apollo, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.getSongs();
  }

  private getSongs() {
    this.spinner.show();
    this.query = this.apollo.watchQuery({
      query: getSongsQuery,
      variables: {}
    });

    this.query.valueChanges.subscribe(res => {
      this.Songs = res.data && res.data.songs;
      this.spinner.hide();
    });
  }

  getSongDetails(song_id: string) {
    this.spinner.show();

    this.query = this.apollo.watchQuery({
      query: getSongQuery,
      variables: { id: song_id }
    });

    this.query.valueChanges.subscribe(({ data, loading }) => {
      this.SelectedSong = data.song;
      this.spinner.hide();
    });
  }

  openAddSongModal(){
    console.log('open song modal');
  }

  openAddArtistModal(){
    console.log('open artist modal');
  }
}
