import { Component, OnInit, Input, Output } from "@angular/core";
import { EventEmitter } from '@angular/core';

@Component({
  selector: "app-song-details",
  templateUrl: "./song-details.component.html",
  styleUrls: ["./song-details.component.css"]
})
export class SongDetailsComponent implements OnInit {
  @Input() Song: any[] = [];
  @Output("openSongModal") openSongModal:EventEmitter<any> = new EventEmitter();
  
  constructor() {}

  ngOnInit() { }

  openParentModal(){
    this.openSongModal.emit();
  }

}
