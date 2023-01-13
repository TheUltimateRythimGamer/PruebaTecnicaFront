import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PartialObserver } from 'rxjs';
import { ArticuloService } from '../services/articulo.service';
import { TiendaService } from '../services/tienda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {

  data: any[] = [];
  @Input() TiendaId: number = 0;

  constructor(
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tiendaService: TiendaService,
    private articuloService: ArticuloService) {

  }

  ngOnInit(): void {
    this.loadData(this.TiendaId)
  }

  private loadData(id: number): void {
    let observer: PartialObserver<any> = {
      next: (res: any) => {
        this.data = res.listado;
      },
      error: (err) => {
        Swal.fire({
          title: 'Error!',
          text: "Se ha producido un error al momento de hacer la llamada",
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      },
    };
    this.articuloService.ObtenerListado(this.TiendaId).subscribe(observer)
  }

  public Add(id: number): void {
    this.router.navigate([`/tienda/detalle/${this.TiendaId}/Articulo/${id}`]);
  }

  public Delete(id: number): void {
    let observer: PartialObserver<any> = {
      next: (res: any) => {
        Swal.fire({
          title: 'Guardado correcto!',
          text: 'Se ha eliminado la informacion correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((data) => {
          this.loadData(this.TiendaId)
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
    this.articuloService.Eliminar(id).subscribe(observer)
  }

}
