import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ArticuloService {


    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('Token')}`
        }),
    };

    constructor(protected http: HttpClient) {

    }

    public ObtenerListadoCompleto(): Observable<any> {
        return this.http.get<any>(`${environment.serverAPIURL}/Articulo/`, this.httpOptions);
    }

    public ObtenerListado(id: number): Observable<any> {
        return this.http.get<any>(`${environment.serverAPIURL}/Articulo/Tienda/${id}`, this.httpOptions);
    }

    public Guardar(json: any): Observable<any> {
        return this.http.post<any>(`${environment.serverAPIURL}/Articulo/`, json, this.httpOptions);
    }

    public ObtenerDetalle(id: number): Observable<any> {
        return this.http.get<any>(`${environment.serverAPIURL}/Articulo/${id}`, this.httpOptions);
    }

    public Eliminar(id: number): Observable<any> {
        return this.http.delete<any>(`${environment.serverAPIURL}/Articulo/${id}`, this.httpOptions);
    }

}