import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OfferLetterField } from '../model/dropdown.model';

import { Offerfields } from '../model/Offerfields';

@Injectable()
export class OfferfieldsService {

    status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];    

    constructor(private http: HttpClient) { }

    /* getProductsSmall() {
        return this.http.get<any>('assets/showcase/data/products-small.json')
        .toPromise()
        .then(res => <Offerfields[]>res.data)
        .then(data => { return data; });
    } */

    getOfferfields() {
        return this.http.get<any>('assets/fields.json')
        .toPromise()
        .then(res => <OfferLetterField[]>res.data)
        .then(data => { return data; });
    }

    /* getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/showcase/data/products-orders-small.json')
        .toPromise()
        .then(res => <Offerfields[]>res.data)
        .then(data => { return data; });
    }

    generatePrduct(): Offerfields {
        const offerFields: Offerfields =  {
            id: this.generateId(),
            fieldName: this.generateName(),
            fieldValue: "Product Description"            
        };

        return offerFields;
    }

    generateId() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
        for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        
        return text;
    }

    generateName() {
        return this.productNames[Math.floor(Math.random() * Math.floor(30))];
    }

    generatePrice() {
        return Math.floor(Math.random() * Math.floor(299)+1);
    }

    generateQuantity() {
        return Math.floor(Math.random() * Math.floor(75)+1);
    }

    generateStatus() {
        return this.status[Math.floor(Math.random() * Math.floor(3))];
    }

    generateRating() {
        return Math.floor(Math.random() * Math.floor(5)+1);
    } */
}