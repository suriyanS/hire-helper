import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentGenerateComponent } from './document-generate.component';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { UploadDataFileComponent } from './upload-data-file/upload-data-file.component';
import { TicketService } from './service/ticket-service';
import { FieldMappingComponent } from './field-mapping/field-mapping.component';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { DocumentGenerationComponent } from './document-generation/document-generation.component';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [
    DocumentGenerateComponent, 
    UploadDataFileComponent, 
    FieldMappingComponent, 
    DocumentGenerationComponent
  ],
  imports: [
    CommonModule,
    StepsModule,
    ToastModule,
    TabViewModule,
    ButtonModule,
		CardModule,
		InputTextModule,
		DropdownModule,
		InputMaskModule,
		CheckboxModule,
    FormsModule,
    FileUploadModule
  ],
  exports:[ DocumentGenerateComponent, 
    UploadDataFileComponent, 
    FieldMappingComponent, 
    DocumentGenerationComponent],
  providers: [
    TicketService
  ]
})
export class DocumentGenerateModule { }
