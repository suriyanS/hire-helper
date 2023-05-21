import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { TemplateService } from '../create-template/create-template-service';
import { DropDownModel, FileOutputFormat } from '../model/dropdown.model';
import { Template } from '../model/Template';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-view-template',
  templateUrl: './view-template.component.html',
  styleUrls: ['./view-template.component.scss'],
})
export class ViewTemplateComponent implements OnInit, AfterViewInit {
  @ViewChild('pdfViewer') public pdfViewer;
  templateList: Array<Template> = new Array<Template>();

  constructor(public templateService: TemplateService, private sanitizer: DomSanitizer, private confirmationService: ConfirmationService, private messageService: MessageService) { }
  showPreview = false;
  showDocGeneration = false;
  showPreDocGeneration = false;
  hideDocGeneration = false;
  currentScreen = "upload"
  previewTemplate: Template = new Template();
  fileOutputFormat: FileOutputFormat = new FileOutputFormat();
  generatedData: Array<FileOutputFormat> = new Array<FileOutputFormat>();
  excelHeaders: Array<DropDownModel> = new Array<DropDownModel>();
  expectedFileName: string;
  pdfPreview: any;
  ngOnInit() {

  }

  ngAfterViewInit() {
    this.getAllTemplates();
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

  onDataGenerated(data) {
    this.generatedData = data;
  }

  onExcelHeaderGenerated(data) {
    this.excelHeaders = data;
  }

  enablePreview(template: Template) {
    this.previewTemplate = template;
    this.generatePreviewDocument(template.content);
  }

  enableGenerate(template: Template) {
    this.showDocGeneration = true;
    this.previewTemplate = template;
  }

  onNxtClick() {
    this.currentScreen = 'document';
  }

  onBackClick() {
    this.currentScreen = 'upload';
  }

  onFileOutputFormatChange(fileOutputFormat: FileOutputFormat) {
    this.fileOutputFormat = fileOutputFormat;
  }

  onGenerateTemplate() {
    this.generatedData.forEach(exportData => {
      let prefixData = exportData.fileFieldMap.filter(f => f.fieldName === this.fileOutputFormat.fileNamePrefix);
      let prefixValue = prefixData && prefixData[0] && prefixData[0].fieldValue ? prefixData[0].fieldValue : exportData.fileNo;
      exportData.uniqueFileName = prefixValue + this.fileOutputFormat.fileName + '.' + this.fileOutputFormat.fileFormat;
      exportData.fileFormat = this.fileOutputFormat.fileFormat;
      exportData.fileNamePrefix = this.fileOutputFormat.fileNamePrefix;
    });

    this.generateDocument(this.generatedData);

  }



  generateDocument(exportData: Array<FileOutputFormat>) {   
    this.templateService.getPdf(exportData).subscribe(
      (response) => {
        let blob = new Blob([response]);
        let filename = this.fileOutputFormat.fileName + '.zip';
        saveAs(blob, filename);
      });
  }

  generatePreviewDocument(html: string) {
    this.templateService.getPdfView(html).subscribe(
      (response) => {
        this.pdfViewer.pdfSrc = response;
        this.pdfViewer.refresh();
        this.showPreview = true;
      });
  }

  deleteTemplate(template: Template) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected Template - ' + template.title + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.templateService.deleteTemplate(template.id).subscribe(status => {
          if (status == template.id) {
            this.getAllTemplates();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Template Deleted', life: 3000 });
          } else {
            this.messageService.add({ severity: 'warn', summary: 'Failed', detail: 'Error occured while Template delete', life: 3000 });
          }
        });

      }
    });
  }



}
