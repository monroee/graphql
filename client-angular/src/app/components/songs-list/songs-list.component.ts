import { Component, OnInit } from "@angular/core";
import { Apollo, QueryRef } from "apollo-angular";
import { NgxSpinnerService } from "ngx-spinner";

import { ToastrService } from "ngx-toastr";

import {
  getSongsQuery,
  getSongQuery,
  addSongMutation,
  addArtistMutation,
  getArtistsQuery,
  updateSongMutation,
  updateArtistMutation,
  deleteSongMutation,
  deleteArtistMutation
} from "../../queries/queries";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddSongComponent } from "../add-song/add-song.component";
import { AddArtistComponent } from "../add-artist/add-artist.component";
import { ModalMsgComponent } from "../modal-msg/modal-msg.component";

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
          this.showSuccess("Song", "saved");
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
          year_started: artist.year_started
        },
        refetchQueries: [{ query: getArtistsQuery }]
      })
      .subscribe(
        ({ data }) => {
          this.spinner.hide();
          this.showSuccess("Artist", "saved");
        },
        error => {
          console.log("Something went wrong on adding artist");
        }
      );
  }

  updateSong(song: any) {
    this.spinner.show();
    this.apollo
      .mutate({
        mutation: updateSongMutation,
        variables: {
          id: song.id,
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
          this.showSuccess("Song", "updated");
        },
        error => {
          console.log("Something went wrong on updating song");
        }
      );
  }

  updateArtist(artist: any) {
    this.spinner.show();
    this.apollo
      .mutate({
        mutation: updateArtistMutation,
        variables: {
          id: artist.id,
          name: artist.name,
          year_started: artist.year_started
        },
        refetchQueries: [{ query: getArtistsQuery }]
      })
      .subscribe(
        ({ data }) => {
          this.spinner.hide();
          this.showSuccess("Artist", "updated");
        },
        error => {
          console.log("Something went wrong on updating artist");
        }
      );
  }

  deleteSong(song: any) {
    this.spinner.show();
    this.apollo
      .mutate({
        mutation: deleteSongMutation,
        variables: {
          id: song.id
        },
        refetchQueries: [{ query: getSongsQuery }]
      })
      .subscribe(
        ({ data }) => {
          this.spinner.hide();
          this.showSuccess("Song", "deleted");
        },
        error => {
          console.log("Something went wrong on deleting song");
        }
      );
  }

  deleteArtist(artist: any) {
    this.spinner.show();
    this.apollo
      .mutate({
        mutation: deleteArtistMutation,
        variables: {
          id: artist.id
        },
        refetchQueries: [{ query: getArtistsQuery }]
      })
      .subscribe(
        ({ data }) => {
          this.spinner.hide();
          this.showSuccess("Artist", "deleted");
        },
        error => {
          console.log("Something went wrong on deleting artist");
        }
      );
  }

  openSongModal(action: string) {
    const modalRef = this.modalService.open(AddSongComponent);
    const title = action === "add" ? "Add Song" : "Update Song";
    const button_title = action === "add" ? "Save" : "Update";
    modalRef.componentInstance.modalTitle = title;
    modalRef.componentInstance.buttonTitle = button_title;
    modalRef.componentInstance.Song =
      action === "add" ? undefined : this.SelectedSong;
    modalRef.result.then(
      data => {
        switch (action) {
          case "add":
            this.addNewSong(data);
            break;
          case "update":
            this.updateSong(data);
            break;
        }
      },
      reason => {}
    );
  }

  openArtistModal(action: string) {
    const modalRef = this.modalService.open(AddArtistComponent);
    const title = action === "add" ? "Add Artist" : "Update Artist";
    modalRef.componentInstance.modalTitle = title;

    modalRef.result.then(
      data => {
        switch (action) {
          case "add":
            this.addNewArtist(data);
            break;
          case "update":
            this.updateArtist(data);
            break;
        }
      },
      reason => {}
    );
  }

  openMsgModal() {
    const modalRef = this.modalService.open(ModalMsgComponent);
    modalRef.componentInstance.modalTitle = "Delete Song";
    modalRef.componentInstance.modalMessage = `Are you sure you want to delete this song? 
                                              \n\n Title: ${this.SelectedSong.title}
                                              \n Album: ${this.SelectedSong.album}
                                              \n Genre: ${this.SelectedSong.genre}
                                              \n Artist: ${this.SelectedSong.artist.name}
                                              `;
    modalRef.componentInstance.modalButtonTitle = "Yes";

    modalRef.result.then(
      data => {
        console.log(data);
        this.deleteSong(this.SelectedSong);
      },
      reason => {
        console.log(reason);
      }
    );
  }

  showSuccess(module: string, action: string) {
    this.toastr.success(`${module} successfully ${action}!`, "", {});
  }
}
