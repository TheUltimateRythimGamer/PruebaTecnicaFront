import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PartialObserver } from 'rxjs';
import { TiendaService } from 'src/app/services/tienda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-tienda',
  templateUrl: './detalle-tienda.component.html',
  styleUrls: ['./detalle-tienda.component.css']
})
export class DetalleTiendaComponent implements OnInit {

  formDetalle = this.fb.group({
    TxtSucursal: ['', [Validators.required]],
    TxtDireccion: ['', [Validators.required]],
  });

  get TxtSucursal() { return this.formDetalle.get('TxtSucursal') }
  get TxtDireccion() { return this.formDetalle.get('TxtDireccion') }
  id: number = 0;

  constructor(
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tiendaService: TiendaService) {

  }

  ngOnInit(): void {
    
    this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      this.id = Number(params["id"]);
    });
    if (this.id != 0)
      this.loadData(this.id);
    else
      setTimeout(() => {
        this.spinner.hide();
      }, 500);
  }

  private loadData(id: number): void {
    let observer: PartialObserver<any> = {
      next: (res: any) => {
        this.TxtDireccion?.setValue(res.user.direccion)
        this.TxtSucursal?.setValue(res.user.sucursal)
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

    this.tiendaService.ObtenerDetalle(this.id).subscribe(observer);
  }

  public Guardar(): void {
    if (this.formDetalle.valid) {
      this.spinner.show();

      let json = {
        Id: this.id,
        Sucursal: this.TxtSucursal?.value,
        Direccion: this.TxtDireccion?.value
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
              this.router.navigate(['/tienda']);
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

      this.tiendaService.GuardarDetalle(json).subscribe(observer);

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
    this.router.navigate(['/tienda']);
  }

}
