import { NgModule } from '@angular/core';
import { CreateTemplateComponent } from './create-template.component';
import { FilterService, MessageService, SharedModule } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import {InputTextModule} from 'primeng/inputtext';
import { CrudOfferFieldsComponent } from './crud-offer-fields/crud-offer-fields.component';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { OfferfieldsService } from '../service/offerfields-service';
import { OfferTemplateEditorComponent } from './offer-template-editor/offer-template-editor.component';
import { EditorModule } from 'primeng/editor';
import { TemplateService } from './create-template-service';


@NgModule({
  declarations: [
    CreateTemplateComponent,
    CrudOfferFieldsComponent,
    OfferTemplateEditorComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    PanelModule,
    InputTextModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    RatingModule,
    DialogModule,
    ConfirmDialogModule,
    EditorModule
  ],
  exports:[CreateTemplateComponent],
  providers: [
    MessageService,
    OfferfieldsService,TemplateService,FilterService
  ]
})
export class CreateTemplateModule { }
