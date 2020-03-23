import { Component, OnInit } from "@angular/core";
import { Apollo, QueryRef } from "apollo-angular";
import { NgxSpinnerService } from "ngx-spinner";

import { ToastrService } from "ngx-toastr";

import {
  getSongsQuery,
  getSongQuery,
  addSongMutation,
  addArtistMutation,
  getArtistsQuery
} from "../../queries/queries";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddSongComponent } from "../add-song/add-song.component";
import { AddArtistComponent } from "../add-artist/add-artist.component";

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

  constructor(
    private apollo: Apollo,
    private spinner: NgxSpinnerService,
    public modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getSongs();
  }

  // TODO : transfer apollo codes to a service.

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

  addNewSong(song: any) {
    this.spinner.show();
    this.apollo
      .mutate({
        mutation: addSongMutation,
        variables: {
          title: song.title,
          genre: song.genre,
          album: song.album,
          artist_id: song.artist
        },
        refetchQueries: [{ query: getSongsQuery }]
      })
      .subscribe(
        ({ data }) => {
          this.spinner.hide();
          this.showSuccess('Song');
        },
        error => {
          console.log("Something went wrong on adding song");
        }
      );
  }

  addNewArtist(artist: any) {
    this.spinner.show();
    this.apollo
      .mutate({
        mutation: addArtistMutation,
        variables: {
          name: artist.name,
          year_started: artist.year_started,
        },
        refetchQueries: [{ query: getArtistsQuery }]
      })
      .subscribe(
        ({ data }) => {
          this.spinner.hide();
          this.showSuccess('Artist');
        },
        error => {
          console.log("Something went wrong on adding artist");
        }
      );
  }

  openAddSongModal() {
    const modalRef = this.modalService.open(AddSongComponent);
    modalRef.componentInstance.modalTitle = "Add Song";

    modalRef.result.then(
      data => {
        this.addNewSong(data);
      },
      reason => {
      }
    );
  }

  openAddArtistModal() {
    const modalRef = this.modalService.open(AddArtistComponent);
    modalRef.componentInstance.modalTitle = "Add Artist";

    modalRef.result.then(
      data => {
        this.addNewArtist(data);
      },
      reason => {
      }
    );
  }

  showSuccess(module: string){
    this.toastr.success(`${module} Successfully saved!`, '', {
    });
  }
}
