import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateTemplateComponent } from './create-template/create-template.component';
import { DocumentGenerateComponent } from './document-generate/document-generate.component';
import { DocumentGenerationComponent } from './document-generate/document-generation/document-generation.component';
import { FieldMappingComponent } from './document-generate/field-mapping/field-mapping.component';
import { UploadDataFileComponent } from './document-generate/upload-data-file/upload-data-file.component';
import { ViewTemplateComponent } from './view-template/view-template.component';


const routes: Routes = [

  { path: '', redirectTo: '/create-template', pathMatch: 'full' },

  { path: 'create-template', component: CreateTemplateComponent },

  { path: 'view-template', component: ViewTemplateComponent },

  {
    path: 'document-generate', component: DocumentGenerateComponent,

    children: [

        { path: '', redirectTo: 'upload-data-file', pathMatch: 'full' },

        { path: 'upload-data-file', component: UploadDataFileComponent },

        { path: 'field-mapping', component: FieldMappingComponent },

        { path: 'document-generation', component: DocumentGenerationComponent }
    ]
  }
];  

@NgModule({
      imports: [RouterModule.forRoot(routes, {useHash: true})],
      exports: [RouterModule]
    })
export class AppRoutingModule { }
