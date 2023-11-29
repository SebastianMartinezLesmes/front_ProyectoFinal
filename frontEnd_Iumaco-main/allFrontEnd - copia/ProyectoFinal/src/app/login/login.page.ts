import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  ngOnInit(){}
  constructor( private router: Router, private http:HttpClient, private alertController: AlertController){ this.getUser(); }

  username: string = '';
  password: string = '';

  id: any = '';

  usuariosDB: any = [];

  fechaActual = new Date();
  fechaFormateada = this.fechaActual.getFullYear();

  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK'],
      mode: 'ios'
    });
  
    await alert.present();
  };  

  getUser() {
    this.http.get('http://localhost/iumaco_db/usuarios.php').subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        this.usuariosDB = response;
      },(error) => {console.error('Error al obtener datos del servidor:', error);}
    )
  };

  login() {
    const inputUsername = String(this.username);
    const inputPassword = this.password;
    const user = this.usuariosDB.find((u: any) => u.numeroTI === inputUsername && u.credenciales === inputPassword);

    if (this.username === '' || this.password === '') {
      // Al menos uno de los campos está vacío
      let camposVacios = '';
      let cont = 0;
    
      if (this.username === '') {
        camposVacios += 'Cedula, ';
        cont = cont + 1;
      }
      if (this.password === '') {
        camposVacios += 'Contraseña, ';
        cont = cont + 1;
      }
    
      camposVacios = camposVacios.slice(0, -2); // Eliminar la coma y el espacio al final
      if (cont === 2){ this.presentAlert("Los siguientes campos son requeridos para ingresar a la paguina",""+ camposVacios ); }
      else { this.presentAlert("El campo "+ camposVacios, "Es requerido para ingresar a la paguina" );}
    }
    else{
      if (user) {
        // Las credenciales son correctas, verificar el valor del campo "cargo"
        if(user.estado === 'inactivo'){ this.presentAlert("Acceso denegado", "Usuario inactivo"); }
        else{
          if (user.cargo === 'instructor') {
            this.id = user.IdUsuario;
            this.limpiar();
            this.router.navigate(['/home', { data: this.id }]);
          } else if (user.cargo === 'coordinador') {
            // Usuario coordinador
            this.id = user.IdUsuario;
            this.limpiar();
            this.router.navigate(['/home-coordinador', { data: this.id }]);
          } else if (user.cargo === 'aprendiz'){
            // Cargo aprendiz
            this.presentAlert("Acceso denegado", "Los aprendices no tienen autorización para acceder a esta página");
          }
        }
      } else { this.presentAlert("usuario inexistente", ""); }
    }
  };  
    
  limpiar(){
    this.username = ''
    this.password = ''
  };
}