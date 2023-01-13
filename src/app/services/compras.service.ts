import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ComprasService {


    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('Token')}`
        }),
    };

    constructor(protected http: HttpClient) {

    }

    public ObtenerListadoCompleto(json: any): Observable<any> {
        return this.http.post<any>(`${environment.serverAPIURL}/Compras`, json, this.httpOptions);
    }

}