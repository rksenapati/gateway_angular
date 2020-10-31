import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CustomDateValidator, PaymentInterface } from 'src/model/Interface.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  private postUrl = 'api/postPayment';
  constructor(private http: HttpClient) { }
  private handleError(error: any) {
    return throwError(error);    
  }
  public checkExpairy(control: AbstractControl): CustomDateValidator | null {
    // console.log(control.value);
    if ((control.value != undefined || control.value != null || control.value != '') ) {
      if(new Date(control.value) < new Date() ){
        console.log('ture');
        return {isDate:true}
      }
    }
    return null
  }
  postPayment(postdata:PaymentInterface): Observable<PaymentInterface[] | {}> {
    let url=this.postUrl
    return this.http.post(url, postdata).pipe(
      catchError(this.handleError)
    );
  }
}
