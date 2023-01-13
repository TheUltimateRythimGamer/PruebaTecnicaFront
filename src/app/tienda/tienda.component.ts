import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PartialObserver } from 'rxjs';
import { TiendaService } from '../services/tienda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {

  data: any[] = [];
  search: string = "";

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private tiendaService: TiendaService
  ) {

  }

  ngOnInit(): void {
    this.spinner.show();
    this.loadData();
  }

  private loadData(): void {
    let observer: PartialObserver<any> = {
      next: (res: any) => {
        this.data = res.listado;
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      },
      error: (err) => {
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
        Swal.fire({
          title: 'Error!',
          text: "Se ha producido un error al momento de hacer la llamada",
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      },
    };
    this.tiendaService.ObtenerListado().subscribe(observer)
  }

  public Add(id: number): void {
    this.router.navigate(['/tienda/detalle/' + id]);
  }

  public Comprar(): void {
    this.router.navigate(['/compras']);
  }

  public Delete(id: number): void {
    let observer: PartialObserver<any> = {
      next: (res: any) => {
        this.spinner.show();
        Swal.fire({
          title: 'Guardado correcto!',
          text: 'Se ha eliminado de manera correcta',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((data) => {
          this.loadData()
        });
      },
      error: (err) => {
        Swal.fire({
          title: 'Error!',
          text: "Se ha producido un error al momento eliminar",
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      },
    };
    this.tiendaService.Eliminar(id).subscribe(observer)
  }
}
