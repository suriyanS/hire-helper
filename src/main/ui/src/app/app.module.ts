import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { WelcomeModule } from './welcome/welcome.module';
import { PrimeNGConfig } from 'primeng/api';
import { SharedModule } from './shared.module';

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
    PrimeNGConfig
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
