import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OfferLetterField } from '../model/dropdown.model';

@Injectable()
export class OfferfieldsService {

    status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];    

    constructor(private http: HttpClient) { }

    getOfferfields() {
        return this.http.get<any>('assets/fields.json')
        .toPromise()
        .then(res => <OfferLetterField[]>res.data)
        .then(data => { return data; });
    }
}