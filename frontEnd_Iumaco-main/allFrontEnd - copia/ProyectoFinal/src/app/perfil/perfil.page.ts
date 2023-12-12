import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  ngOnInit(){};
  constructor(private router: Router, private route: ActivatedRoute, private http:HttpClient, private alertController: AlertController) 
  { 
    this.id = this.route.snapshot.paramMap.get('data');
    this.getPerfil();
  };

  usuariosDB: any = [];
  id: any = ''; 
  cargo: any = '';

  perfiles: any = [];
  miPerfil: any = [];
  getPerfil() {
    this.http.get('http://localhost/iumaco_db/usuarios.php').subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        this.perfiles = response;
        this.miPerfil = this.perfiles.filter((u: any) => u.IdUsuario === this.id);
      },(error) => {console.error('Error al obtener datos del servidor:', error);}
    )
  };

  get(p:any){
    this.cargo = p.cargo;
    this.irHome(); 
  }

  irHome(){
    this.cargo = this.cargo 
    if(this.cargo === 'instructor'){ this.router.navigate(['/home', { data: this.id }]); }
    else if(this.cargo === 'coordinador'){ this.router.navigate(['/home-coordinador', { data: this.id }]); }
  }
  
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
      ],
      mode: 'ios'
    });
  
    await alert.present();
  };  
}