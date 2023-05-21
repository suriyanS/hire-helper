import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from '../service/ticket-service';

@Component({
  selector: 'app-field-mapping',
  templateUrl: './field-mapping.component.html',
  styleUrls: ['./field-mapping.component.scss']
})
export class FieldMappingComponent implements OnInit {

  constructor(public ticketService: TicketService, private router: Router) { }

    classes: any[];

    vagons: any[];
    
    seats: any[];

    seatInformation: any;

    ngOnInit() { 
        this.seatInformation = this.ticketService.ticketInformation.seatInformation;

        this.classes = [
            {name: 'First Class', code: 'A', factor: 1},
            {name: 'Second Class', code: 'B', factor: 2},
            {name: 'Third Class', code: 'C', factor: 3}
        ];    
    }

    setVagons(event) {
        if (this.seatInformation.class && event.value) {
            this.vagons = [];
            this.seats = [];
            for (let i = 1; i < 3 * event.value.factor; i++) {
                this.vagons.push({wagon: i + event.value.code, type: event.value.name, factor: event.value.factor});
            }
        }
    }
    
    setSeats(event) {
        if (this.seatInformation.wagon && event.value) {
            this.seats = [];
            for (let i = 1; i < 10 * event.value.factor; i++) {
                this.seats.push({seat: i, type: event.value.type});
            }
        }
    }

    nextPage() {
        this.ticketService.ticketInformation.seatInformation = this.seatInformation;
        this.router.navigate(['document-generate/document-generation']);
    }

    prevPage() {
      this.router.navigate(['document-generate/upload-data-file']);
    }

}
