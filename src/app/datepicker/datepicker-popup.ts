import { Component, OnInit, Input } from '@angular/core';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-datepicker-popup',
  templateUrl: './datepicker-popup.html'
})

export class NgbdDatepickerPopup implements OnInit {
  model: NgbDateStruct = new NgbDate(-1, -1, -1);

  @Input() placeholder: string = "";

  constructor() { }

  ngOnInit() {
  }
}
