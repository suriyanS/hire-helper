import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if the environment is production
    if (environment.production) {
      // Clone the request and add the /api prefix to the URL
      request = request.clone({ url: `/api${request.url}` });
    }

    // Pass the modified request to the next interceptor or the backend server
    return next.handle(request);
  }
}
