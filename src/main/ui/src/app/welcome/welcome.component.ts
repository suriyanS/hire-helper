import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { WelcomeService } from './welcome.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  title = 'ASPIRE MINDS';
  message: string;
  items: MenuItem[];

  constructor(public service: WelcomeService) { }

  ngOnInit() {
    this.welcomePage();
    this.loadMenu();
  }

  loadMenu() {
    this.items = [
      {
        label: 'Create Template',
        icon: 'pi pi-fw pi-book',
        routerLink: ['/create-template']
      },
      {
        label: 'View Template',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/view-template']//,
      }

    ];
  }

  welcomePage() {
    this.service.getWelcomePage().subscribe(data=>{
      this.service.message = data['message'];
    })
  }

}
