import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class WelcomeService {
    message: string;
    constructor(private http: HttpClient) {

    }
    getWelcomePage(): Observable<any> {
      return this.http.get<any>('/welcome');
    }
}