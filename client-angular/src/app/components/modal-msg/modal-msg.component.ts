import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-modal-msg',
  templateUrl: './modal-msg.component.html',
  styleUrls: ['./modal-msg.component.css']
})
export class ModalMsgComponent implements OnInit {

  modalTitle: string;
  modalMessage: string;
  modalButtonTitle: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  onSubmit(){
    this.activeModal.close('true');
  }

}
