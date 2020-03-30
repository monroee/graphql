import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { getArtistsQuery } from "../../queries/queries";
import { Apollo, QueryRef } from "apollo-angular";

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css']
})
export class AddSongComponent implements OnInit {
  modalTitle: string;
  buttonTitle: string;
  SongForm: FormGroup;
  Song: any;
  Submitted = false;

  query: QueryRef<any>;
  Artists: any[] = [];

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private apollo: Apollo) { }

  ngOnInit(){
    this.SongForm = this.formBuilder.group({
      id: [this.Song ? this.Song.id : ''],
      title: [this.Song ? this.Song.title : '', Validators.required],
      album: [this.Song ? this.Song.album : '', Validators.required],
      genre: [this.Song ? this.Song.genre : '', Validators.required],
      artist: [this.Song ? this.Song.artist.id : '', Validators.required]
    });
    
    this.getArtists();
  }

  getArtists(){
    this.query = this.apollo.watchQuery({
      query: getArtistsQuery,
      variables: {}
    });

    this.query.valueChanges.subscribe(res => {
      this.Artists = res.data && res.data.artists;
    });
  }
  
  get f() { return this.SongForm.controls };

  onSubmit(){
    this.Submitted = true;

    if(this.SongForm.invalid) return;

    this.activeModal.close(this.SongForm.value);
  }

  onReset(){
    this.Submitted = false;
    this.SongForm.reset();
  }
}
