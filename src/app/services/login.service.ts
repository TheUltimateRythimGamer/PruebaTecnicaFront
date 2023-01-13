import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LoginService {


    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
    };

    constructor(protected http: HttpClient) { }

    Login(json: any): Observable<any> {
        return this.http.post<any>(`${environment.serverAPIURL}/token`, json, this.httpOptions);
    }

}