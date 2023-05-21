import { NgModule } from '@angular/core';
import { WelcomeComponent } from './welcome.component';
import { WelcomeService } from './welcome.service';
import { MenubarModule } from 'primeng/menubar';
import { CreateTemplateModule } from '../create-template/create-template.module';
import { ViewTemplateModule } from '../view-template/view-template.module';
import { DocumentGenerateModule } from '../document-generate/document-generate.module';
import { SharedModule } from '../shared.module';
import { TableModule } from 'primeng/table';

@NgModule({
    imports: [SharedModule,TableModule,   
        CreateTemplateModule,
        ViewTemplateModule,
        DocumentGenerateModule,
        MenubarModule
    ],
    exports: [TableModule,WelcomeComponent],
    declarations: [WelcomeComponent],
    providers: [WelcomeService]
})
export class WelcomeModule { }
