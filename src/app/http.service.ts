import { Injectable } from '@angular/core';

import { HttpClient,HttpErrorResponse,HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      // errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }


  getMethod(url:any){
    // const options = { params: new HttpParams({fromString:queryString }) };
    return this.http.get(url)
  }

  postMethod(url:any,body:any){
    return this.http.post(url,body)
  }

  putMethod(url:any,body:any){
    return this.http.put(url,body)
  }

  deleteMEthod(url:any,body:any){
    return this.http.delete(url,body)
  }


}
