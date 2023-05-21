import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TemplateService } from 'src/app/create-template/create-template-service';
import { DropDownModel, FileOutputFormat } from 'src/app/model/dropdown.model';
import { TicketService } from '../service/ticket-service';

@Component({
  selector: 'app-document-generation',
  templateUrl: './document-generation.component.html',
  styleUrls: ['./document-generation.component.scss']
})
export class DocumentGenerationComponent implements OnInit {

  fileformats: any[];
  fields: any[];
  fileOutputFormat: FileOutputFormat = new FileOutputFormat();
  selectedFileFormat: any;
  selectedFilePrefix: DropDownModel = new DropDownModel();
  @Output()
  backBtnClick: EventEmitter<Boolean> = new EventEmitter();

  @Output()
  fileOutputFormatChange: EventEmitter<FileOutputFormat> = new EventEmitter();

  @Output()
  generateBtnClick: EventEmitter<Boolean> = new EventEmitter();

  @Input()
  excelHeaders: Array<DropDownModel> = new Array<DropDownModel>();

  constructor(public ticketService: TicketService, private router: Router, private templateService: TemplateService) { }

  ngOnInit() {
    this.fileformats = [
      { name: 'PDF', code: 'pdf', factor: 1 },
      // { name: 'DOCX', code: 'docx', factor: 2 }
    ];

    this.fields = [
      { name: 'Employee Name', code: 'employeeName', factor: 1 },
      { name: 'Employee Designation', code: 'employeeDesignation', factor: 2 }
    ];

    
  }



  onSelectedFormatChange(){
    this.fileOutputFormat.fileFormat = this.selectedFileFormat.code;
  }
  onSelectedPrefixChange(){   
    this.fileOutputFormat.fileNamePrefix = this.selectedFilePrefix.name;
  }
  prevPage() {
    this.backBtnClick.emit(true);
  }

  generateDocument() {
    if( this.isEmpty(this.fileOutputFormat.fileFormat) || this.isEmpty(this.fileOutputFormat.fileName)){
      return;
    }
    this.fileOutputFormatChange.emit(this.fileOutputFormat);
    this.generateBtnClick.emit(true);
  }

  isEmpty(checkVal){
    return ((checkVal === undefined || checkVal === null || checkVal === '' || checkVal === 'NULL') || (Array.isArray(checkVal) && checkVal.length===0));
   };
}
