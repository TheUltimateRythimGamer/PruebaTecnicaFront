import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PartialObserver } from 'rxjs';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formDetalle = this.fb.group({
    TxtCorreo: ['', [Validators.required]],
    TxtContrasenia: ['', [Validators.required]],
  });

  get TxtCorreo() { return this.formDetalle.get('TxtCorreo') }
  get TxtContrasenia() { return this.formDetalle.get('TxtContrasenia') }

  constructor(
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  public IniciarSesion(): void {
    if (this.TxtContrasenia?.value == '' || this.TxtCorreo?.value == '')
      return;

    this.spinner.show();
    let json = {
      Correo: this.TxtCorreo?.value,
      Contrasenia: this.TxtContrasenia?.value
    };
    let observer: PartialObserver<any> = {
      next: (res: any) => {
        localStorage.setItem('Token', res.token);
        setTimeout(() => {
          this.spinner.hide();
          this.router.navigate(['/tienda']);
        }, 500);
      },
      error: (err) => {
        Swal.fire({
          title: 'Error!',
          text: "El usuario o contraseña son incorrectos",
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      },
    };
    this.loginService.Login(json).subscribe(observer);
  }

}
