import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleArticuloComponent } from './articulo/detalle-articulo/detalle-articulo.component';
import { ComprasComponent } from './compras/compras.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
import { DetalleTiendaComponent } from './tienda/detalle-tienda/detalle-tienda.component';
import { TiendaComponent } from './tienda/tienda.component';

/** 
 * Al ser unicamente una aplicacion de pocas pantallas con una funcionalidad pequeña
 * no se utilizaran tenicas de mejora de rendimiento como lo puede ser lazy loading o quicklinkstrategy
 * pero si se planeara hacer crecer esta aplicacion se recomendaria aplicar dichas tenicas para la optimizacion
 * del codigo para el usuario final
*/

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'tienda', component: TiendaComponent,
    canActivate: [AuthGuard],
    children: [

    ]
  },
  { path: 'compras', component: ComprasComponent, canActivate: [AuthGuard], },
  { path: 'tienda/detalle/:id', component: DetalleTiendaComponent, canActivate: [AuthGuard], },
  { path: 'tienda/detalle/:TiendaId/Articulo/:id', component: DetalleArticuloComponent, canActivate: [AuthGuard], },
  { path: '', redirectTo: '/tienda', pathMatch: 'full' },
  { path: '**', redirectTo: '/tienda', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
