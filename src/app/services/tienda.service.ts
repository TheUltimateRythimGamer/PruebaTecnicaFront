import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TiendaService {


    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('Token')}`
        }),
    };

    constructor(protected http: HttpClient) { }

    public ObtenerListado(): Observable<any> {
        return this.http.get<any>(`${environment.serverAPIURL}/Tienda`, this.httpOptions);
    }

    public GuardarDetalle(json: any): Observable<any> {
        return this.http.post<any>(`${environment.serverAPIURL}/Tienda`, json, this.httpOptions);
    }

    public ObtenerDetalle(id: any): Observable<any> {
        return this.http.get<any>(`${environment.serverAPIURL}/Tienda/${id}`, this.httpOptions);
    }

    public Eliminar(id: any): Observable<any> {
        return this.http.delete<any>(`${environment.serverAPIURL}/Tienda/${id}`, this.httpOptions);
    }


}