import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { OfferLetterField } from 'src/app/model/dropdown.model';

@Component({
  selector: 'app-crud-offer-fields',
  templateUrl: './crud-offer-fields.component.html',
  styleUrls: ['./crud-offer-fields.component.scss'],
  styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
    providers: [MessageService, ConfirmationService]
})
export class CrudOfferFieldsComponent implements OnInit {

    @Input()
    offerLetterFields: Array<OfferLetterField>;
    
    @Output()
    offerLetterFieldsChange: EventEmitter<any> = new EventEmitter<any>();

    offerfieldsDialog: boolean;

    offerfield: OfferLetterField;

    selectedOfferfields: Array<OfferLetterField>;

    submitted: boolean;

    statuses: any[];

    index = 0;

    editMode = false;

    constructor(private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {     

        this.statuses = [
            {label: 'INSTOCK', value: 'instock'},
            {label: 'LOWSTOCK', value: 'lowstock'},
            {label: 'OUTOFSTOCK', value: 'outofstock'}
        ];
    }

    openNew() {
        this.offerfield = new OfferLetterField();
        this.submitted = false;
        this.offerfieldsDialog = true;
    }

    deleteSelectedOfferfields() {
        if(!this.selectedOfferfields){
            return;
        }
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected offerfields?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.offerLetterFields = this.offerLetterFields.filter(val => !this.selectedOfferfields.includes(val));
                this.selectedOfferfields = null;
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Offerfield Deleted', life: 3000});
            }
        });
    }

    editOfferfield(offerfield: OfferLetterField) {
        this.offerfield = offerfield;
        this.editMode = true;
        this.offerfieldsDialog = true;
    }

    deleteOfferfield(offerfield: OfferLetterField) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + offerfield.fieldName + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.offerLetterFields = this.offerLetterFields.filter(val => val.id !== offerfield.id);
                this.offerfield = new OfferLetterField();
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Offerfield Deleted', life: 3000});
            }
        });
    }

    hideDialog() {
        this.offerfield = new OfferLetterField();
        this.offerfieldsDialog = false;        
        this.submitted = false;
    }
    
    saveOfferfield() {
        this.submitted = true;
        if(!this.offerLetterFields || this.offerLetterFields.length == 0){
            this.offerLetterFields = new Array<OfferLetterField>();
        }
     
            if (this.offerfield.fieldName) {
                let index = this.offerLetterFields.indexOf(this.offerfield);
                if(index >= 0){
                    this.offerLetterFields[index] = this.offerfield;   
                    this.editMode = false;             
                    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Offerfield Updated', life: 3000});
                }else{                   
                    this.offerLetterFields.push(this.offerfield);
                    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Offerfield Created', life: 3000});
                }

                this.offerLetterFieldsChange.emit(this.offerLetterFields);
                this.offerfield = new OfferLetterField();
                this.offerfieldsDialog = false;  
                
            }   
                     
             
        
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.offerLetterFields.length; i++) {
            if (this.offerLetterFields[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for ( var i = 0; i < 5; i++ ) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

}
