import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.css']
})
export class AddArtistComponent implements OnInit {

  modalTitle: string;
  ArtistForm: FormGroup;
  Submitted = false;
  MinYearValue= parseInt("1800");
  MaxYearValue = parseInt(new Date().getFullYear().toString());

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.ArtistForm = this.formBuilder.group({
      name: ['', Validators.required],
      year_started: ['', [Validators.required, Validators.min(this.MinYearValue), Validators.max(this.MaxYearValue)]]
    });
  }

  get f() { return this.ArtistForm.controls; }

  onSubmit(){
    this.Submitted = true
    
    if(this.ArtistForm.invalid) return;

    this.activeModal.close(this.ArtistForm.value);
  }

  onReset(){
    this.Submitted = false;
    this.ArtistForm.reset();
  }

}
