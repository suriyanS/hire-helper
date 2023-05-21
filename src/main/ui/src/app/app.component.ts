import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { WelcomeComponent } from './welcome/welcome.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[WelcomeComponent]
})
export class AppComponent implements OnInit {
  title = 'app';

  message: string;

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void { 
    this.primengConfig.ripple = true;    
  }
}
