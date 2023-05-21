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
        return this.http.get<Array<Template>>('/all-templates');
    }    

    downloadFile(data): any {
        const REQUEST_PARAMS = new HttpParams().set('fileName',data.filename);
        const REDQUEST_URI = '/download';
        return this.http.post(REDQUEST_URI, {
            params: REQUEST_PARAMS,
            responseType: 'arrayBuffer'
        });
    }

    getPdf(data): any{
        return this.http.post('/getpdf',data, { headers: new HttpHeaders({          
            'Content-Type': 'application/json',
          }), responseType: 'blob'});
    }

    getPdfView(data): any{
        return this.http.post('/getpdfview',data, { headers: new HttpHeaders({          
            'Content-Type': 'application/json',
          }), responseType: 'blob'});
    }

    saveTemplate(template: Template): Observable<any> {
        return this.http.post('/create-template',template);
    }

    deleteTemplate(id): Observable<any> {
        let params = new HttpParams();
        params.append('id', id);
        return this.http.post('/delete-template',id);
    }
}