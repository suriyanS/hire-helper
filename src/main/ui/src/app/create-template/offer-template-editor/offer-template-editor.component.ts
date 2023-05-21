import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-offer-template-editor',
  templateUrl: './offer-template-editor.component.html',
  styleUrls: ['./offer-template-editor.component.scss']
 
})
export class OfferTemplateEditorComponent implements OnInit {
  @Input() content: string;
  @Output() contentChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onContentChange(){
    this.contentChange.emit(this.content);
  }

}
