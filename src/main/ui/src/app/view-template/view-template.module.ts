import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewTemplateComponent } from './view-template.component';
import { CardModule } from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import { TemplateService } from '../create-template/create-template-service';
import {DialogModule} from 'primeng/dialog';
import { CreateTemplateModule } from '../create-template/create-template.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DocumentGenerateModule } from '../document-generate/document-generate.module';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer'; 
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [ViewTemplateComponent],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,ToastModule,
    DialogModule,CreateTemplateModule,PdfViewerModule,DocumentGenerateModule,PdfJsViewerModule,ConfirmDialogModule
  ],
  exports: [],
  providers: [TemplateService,MessageService,ConfirmationService]
})
export class ViewTemplateModule { }
