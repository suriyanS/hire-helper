import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { WelcomeModule } from './welcome/welcome.module';
import { PrimeNGConfig } from 'primeng/api';
import { SharedModule } from './shared.module';
import { SharedService } from './shared.service';
import { ApiPrefixInterceptor } from './api-prefix.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    HttpClientModule,
    AppRoutingModule,
    WelcomeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true
    },
    PrimeNGConfig,
    SharedService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
