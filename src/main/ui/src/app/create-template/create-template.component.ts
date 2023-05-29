import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Template } from '../model/Template';
import { TemplateService } from './create-template-service';
import { finalize } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { OfferLetterField } from '../model/dropdown.model';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss'],
  providers: [MessageService]
})
export class CreateTemplateComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('templateTitle') templateTitle: ElementRef;
  @Input()
  templateModel: Template = new Template();
  templateList: Array<Template> = new Array<Template>();
  selectedField: string;
  editMode: boolean;
  dataSubscription: Subscription;
  constructor(public templateService: TemplateService, private messageService: MessageService,
    private route: ActivatedRoute, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.dataSubscription = this.route.data.subscribe(data => {
      this.editMode = data.editMode;
      if (this.editMode) {
        this.templateModel = this.sharedService.getSharedData();
      } else {
        this.templateModel = new Template();
      }
    });
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

  onContentChange(template: string) {
    const regex = /{([^}]+)}/g;
    this.templateModel.fields = new Array<OfferLetterField>();
    const match = template?.match(regex)?.map(value => value = value.replace(/[{}]/g, "")) || [];
    if (match.length > 0) {
      for (let index in match) {
        let field = new OfferLetterField();
        const extractedField = match[index];
        field.fieldName = extractedField;
        const existingFields = this.templateModel.fields.filter(field => field.fieldName == extractedField);
        if (existingFields.length == 0)
          this.templateModel.fields.push(field);
      }
    }
  }

  onFieldSelect(field: OfferLetterField) {
    console.log(field.fieldName);
    this.templateModel.content = this.appendValueToHTML("{" + field.fieldName + "}", this.templateModel.content);
  }

  private appendValueToHTML(value, htmlString): string {
    // Create a temporary element to hold the HTML string
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlString;

    // Find the <p> tag within the temporary element
    const paragraph = tempElement.querySelector("p");

    // Append the value inside the <p> tag
    paragraph.innerHTML += value;

    // Return the updated HTML string
    return tempElement.innerHTML;
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}


