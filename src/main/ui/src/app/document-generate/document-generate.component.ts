import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { TicketService } from './service/ticket-service';

@Component({
  selector: 'app-document-generate',
  templateUrl: './document-generate.component.html',
  styleUrls: ['./document-generate.component.scss'],
  providers: [MessageService]
})
export class DocumentGenerateComponent implements OnInit {

  items: MenuItem[];

  subscription: Subscription;

  constructor(public messageService: MessageService, public ticketService: TicketService) { }

  ngOnInit() {
    this.items = [{
      label: 'Upload data file',
      routerLink: 'upload-data-file'
    },
    // ,
    // {
    //   label: 'Map Fields',
    //   routerLink: 'field-mapping'
    // },
    {
      label: 'Document Generation',
      routerLink: 'document-generation'
    }/* ,
    {
      label: 'Confirmation',
      routerLink: 'confirmation'
    } */
    ];

    this.subscription = this.ticketService.paymentComplete$.subscribe((personalInformation) => {
      this.messageService.add({ severity: 'success', summary: 'Order submitted', detail: 'Dear, ' + personalInformation.firstname + ' ' + personalInformation.lastname + ' your order completed.' });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
