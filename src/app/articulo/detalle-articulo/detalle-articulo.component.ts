import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PartialObserver } from 'rxjs';
import { ArticuloService } from 'src/app/services/articulo.service';
import { TiendaService } from 'src/app/services/tienda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-articulo',
  templateUrl: './detalle-articulo.component.html',
  styleUrls: ['./detalle-articulo.component.css']
})
export class DetalleArticuloComponent implements OnInit {

  tiendaId: number = 0;
  id: number = 0;

  formDetalle = this.fb.group({
    TxtCodigo: ['', [Validators.required]],
    TxtDescripcion: ['', [Validators.required]],
    TxtPrecio: ['', [Validators.required]],
    TxtImagen: ['', [Validators.required]],
    TxtStock: ['', [Validators.required]],
  });

  get TxtCodigo() { return this.formDetalle.get('TxtCodigo') }
  get TxtDescripcion() { return this.formDetalle.get('TxtDescripcion') }
  get TxtPrecio() { return this.formDetalle.get('TxtPrecio') }
  get TxtImagen() { return this.formDetalle.get('TxtImagen') }
  get TxtStock() { return this.formDetalle.get('TxtStock') }

  constructor(
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private articuloService: ArticuloService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.tiendaId = Number(params["TiendaId"])
      this.id = Number(params["id"]);
      if (this.id != 0)
        this.loadData(this.id);
    });
  }

  private loadData(id: number): void {
    this.spinner.show();

    let observer: PartialObserver<any> = {
      next: (res: any) => {
        console.log(res)

        this.TxtCodigo?.setValue(res.item.codigo);
        this.TxtDescripcion?.setValue(res.item.descripcion);
        this.TxtImagen?.setValue(res.item.imagen);
        this.TxtPrecio?.setValue(res.item.precio);
        this.TxtStock?.setValue(res.item.stock);

        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      },
      error: (err) => {
        Swal.fire({
          title: 'Error!',
          text: "Ocurrio un error al momento de cargar",
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      }
    };

    this.articuloService.ObtenerDetalle(id).subscribe(observer);
  }

  public Guardar(): void {
    if (this.formDetalle.valid) {
      this.spinner.show();

      let json = {
        Id: this.id,
        Codigo: this.TxtCodigo?.value,
        Descripcion: this.TxtDescripcion?.value,
        Precio: this.TxtPrecio?.value,
        Imagen: this.TxtImagen?.value,
        Stock: this.TxtStock?.value,
        TiendaId: this.tiendaId,
      };

      let observer: PartialObserver<any> = {
        next: (res: any) => {
          setTimeout(() => {
            this.spinner.hide();
            Swal.fire({
              title: 'Guardado correcto!',
              text: 'Se ha guardado la informacion correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then((data) => {
              this.router.navigate([`/tienda/detalle/${this.tiendaId}`]);
            });
          }, 500);
        },
        error: (err) => {
          Swal.fire({
            title: 'Error!',
            text: "Ocurrio un error al momento de guardar",
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
          setTimeout(() => {
            this.spinner.hide();
          }, 500);
        }
      };
      this.articuloService.Guardar(json).subscribe(observer);
    }
    else {
      Swal.fire({
        title: 'Error!',
        text: 'Algunos campos estan incompletos o tienen errores en ellos',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  public Cancelar(): void {
    this.router.navigate([`/tienda/detalle/${this.tiendaId}`]);
  }
}
