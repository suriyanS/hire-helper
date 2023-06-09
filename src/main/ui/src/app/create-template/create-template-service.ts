import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Template } from "../model/Template";


@Injectable()
export class TemplateService {
    offerLetterFields: Array<Template> = new Array<Template>();
    constructor(private http: HttpClient) {

    }
    getAllTemplates(): Observable<Array<Template>> {
        return this.http.get<Array<Template>>('/templates');
    }

    downloadFile(data): any {
        const REQUEST_PARAMS = new HttpParams().set('fileName', data.filename);
        const REDQUEST_URI = '/download';
        return this.http.post(REDQUEST_URI, {
            params: REQUEST_PARAMS,
            responseType: 'arrayBuffer'
        });
    }

    generatePDFZip(data): any {
        return this.http.post('/templates/pdf/zip', data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }), responseType: 'blob'
        });
    }

    generateDocxZip(data): any {
        return this.http.post('/templates/doc/zip', data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }), responseType: 'blob'
        });
    }

    generatePDF(data): any {
        return this.http.post('/templates/pdf', data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }), responseType: 'blob'
        });
    }

    createTemplate(template: Template): Observable<any> {
        return this.http.post('/templates', template);
    }

    updateTemplate(template: Template): Observable<any> {
        return this.http.put('/templates', template);
    }

    deleteTemplate(id: number): Observable<any> {
        return this.http.delete(`/templates/${id}`);
    }
}