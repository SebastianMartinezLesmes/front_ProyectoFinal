import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  id: any = '';

  historialFelicitar = false;
  reFelicitar: any = [];
  gHistorialFelicitar: any = [];
  getHistorialF() {
    this.http.get('http://localhost/iumaco_db/getListaFelicitaciones.php').subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        this.reFelicitar = response;
        this.gHistorialFelicitar = this.reFelicitar.filter((u: any) => u.instructorFK === this.id);
      },(error) => {console.error('Error al obtener datos del servidor:', error);}
    )
  };

  historialLlamado = false;
  reLlamado: any = [];
  gHistorialLlamado: any = [];
  getHistorialL() {
    this.http.get('http://localhost/iumaco_db/getListaLlamado.php').subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        this.reLlamado = response;
        this.gHistorialLlamado = this.reLlamado.filter((u: any) => u.instructorFK === this.id);
      },(error) => {console.error('Error al obtener datos del servidor:', error);}
    )
  };

  historialSolicitud = false;
  reSolicitud: any = [];
  gHistorialSolicitud: any = [];
  getHistorialS() {
    this.http.get('http://localhost/iumaco_db/getListaSolicitudes.php').subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        this.reSolicitud = response;
        this.gHistorialSolicitud = this.reSolicitud.filter((u: any) => u.instructorFK === this.id);
      },(error) => {console.error('Error al obtener datos del servidor:', error);}
    )
  };

  ngOnInit(){}
  constructor(private router: Router, private alertController: AlertController,private route: ActivatedRoute, private http:HttpClient) {
    this.id = this.route.snapshot.paramMap.get('data');
    this.getHistorialS();
    this.getHistorialL();
    this.getHistorialF();
    this.permiso();
  }    

  cambiarEstadoF(){
    if(this.historialFelicitar === false){this.historialFelicitar = true;}
    else{ this.historialFelicitar = false}
  }
  cambiarEstadoL(){
    if(this.historialLlamado === false){this.historialLlamado = true;}
    else{ this.historialLlamado = false}
  }
  cambiarEstadoS(){
    if(this.historialSolicitud === false){this.historialSolicitud = true;}
    else{ this.historialSolicitud = false}
  }

  /* Aca estan los parametros para los botones de navegacion hacia los formularios que envian los correos*/
  felicitarAprendiz() { this.router.navigate(['felicitar-aprendiz', { data: this.id }]); }
  llamadoAtencion() { this.router.navigate(['/llamado-atencion', { data: this.id }]); }
  citacionComite() { this.router.navigate(['/citacion-comite', { data: this.id }]); }

  async confirmarSalida() {
    const alert = await this.alertController.create({
      header: 'Confirmar salida',
      message: '¿Está seguro de que desea cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'secondary',
          handler: () => {}
        },
        {
          text: 'Aceptar',
          handler: () => { this.router.navigate(['/login']); }
        }
      ]
    });
  
    await alert.present();
  };  
  permiso(){
    if (this.id === '' || this.id === null){this.router.navigate(['/login']); }
  }
}
