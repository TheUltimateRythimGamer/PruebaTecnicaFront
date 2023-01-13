import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PartialObserver } from 'rxjs';
import Swal from 'sweetalert2';
import { ArticuloService } from '../services/articulo.service';
import { ComprasService } from '../services/compras.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent {

  data: any[] = [];
  carritoData: any[] = [];
  itemsComprados: number = 0;
  totalItemCompradas: number = 0;

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private articuloService: ArticuloService,
    private comprasService: ComprasService
  ) {

  }

  ngOnInit(): void {
    this.spinner.show();
    this.loadData();
  }

  public comprarCarrito(): void {
    this.spinner.show();
    let observer: PartialObserver<any> = {
      next: (res) => {
        Swal.fire({
          title: 'Compra correcta!',
          text: 'Se ha realizado la compra correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      },
      error: (err) => {
        Swal.fire({
          title: 'Error!',
          text: "Ocurrio un error al momento de comprar",
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      }
    };
    let json = {
      ArticulosId: this.carritoData.map(x => x.id)
    }
    this.comprasService.ObtenerListadoCompleto(json).subscribe(observer)
  }

  public AddCarrito(id: number, numberItems: string, precio: any): void {
    if (this.carritoData.find(x => x.id == id))
      this.carritoData.find(x => x.id == id).numberItems = Number(numberItems);
    else
      this.carritoData.push({ id: id, numberItems: Number(numberItems), precio: Number(precio) });

    this.itemsComprados = this.CarritoLength();
    this.totalItemCompradas = this.CarritoTotal();
  }

  public CarritoLength(): number {
    return this.carritoData.map(item => item.numberItems).reduce((a, b) => a + b, 0);
  }

  public CarritoTotal(): number {
    return this.carritoData.map(item => item.precio * item.numberItems).reduce((a, b) => a + b, 0);
  }

  private loadData(): void {
    let observer: PartialObserver<any> = {
      next: (res: any) => {
        console.log(res)
        this.data = res.listado;
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

    this.articuloService.ObtenerListadoCompleto().subscribe(observer);
  }
}
