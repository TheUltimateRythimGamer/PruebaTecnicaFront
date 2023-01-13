import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TiendaComponent } from './tienda/tienda.component';
import { DetalleTiendaComponent } from './tienda/detalle-tienda/detalle-tienda.component';
import { ArticuloComponent } from './articulo/articulo.component';
import { DetalleArticuloComponent } from './articulo/detalle-articulo/detalle-articulo.component';
import { ComprasComponent } from './compras/compras.component';

/**
 * Al ser una aplicacion pequeña se utilizaran los archivos de env normales de angular
 * pero para una automatizacion de procesos de despliegue a los servidores se podria utilizar un servicio de configuracion
 * que lea un archivo json y dependiendo de la url en la que se encuentre conectarse a servidores de back diferentes,
 * ya sea para QA, DEV, Pre-PROD o PROD
 */

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TiendaComponent,
    DetalleTiendaComponent,
    ArticuloComponent,
    DetalleArticuloComponent,
    ComprasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
