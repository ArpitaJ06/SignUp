import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private postURL = "https://demo-api.vercel.app/users";

  constructor(private http: HttpClient) { }

  postDetails(formData: any): Observable<any> {
    return this.http.post<any>(this.postURL, formData);
  }
}
