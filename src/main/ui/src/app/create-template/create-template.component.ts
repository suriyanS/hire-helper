import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Template } from '../model/Template';
import { TemplateService } from './create-template-service';
import { finalize } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss'],
  providers: [MessageService]
})
export class CreateTemplateComponent implements OnInit, AfterViewInit {
  @ViewChild('templateTitle', {static: false}) templateTitle:ElementRef;
  @Input()
  templateModel: Template = new Template();
  templateList: Array<Template> = new Array<Template>();
  constructor(public templateService: TemplateService, private messageService: MessageService) { }

  ngOnInit() {
    // document.getElementById("templateTitle").focus();
  }

  ngAfterViewInit() {
    this.templateTitle.nativeElement.focus()
}

  onSaveTemplate() {
    let obj = this;
    if (!obj.templateModel || !obj.templateModel.title || !obj.templateModel.content) {
      return;
    }
    this.templateService.saveTemplate(obj.templateModel).pipe(finalize(() => { })
    ).subscribe((result: Template) => {   
      this.templateModel = new Template();
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Template Saved Successfully!', life: 3000 });
    },
      err => {
        console.log(err);
      }
    );

  }

  getAllTemplates() {
    let obj = this;
    this.templateService.getAllTemplates().pipe(finalize(() => { })
    ).subscribe(result => {
      obj.templateList = result;

    },
      err => {
        console.log(err);
      }
    )
  }

}
