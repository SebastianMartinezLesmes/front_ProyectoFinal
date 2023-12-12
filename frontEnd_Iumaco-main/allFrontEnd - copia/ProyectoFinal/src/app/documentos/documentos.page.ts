import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.page.html',
  styleUrls: ['./documentos.page.scss'],
})
export class DocumentosPage implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private http: HttpClient,
  ) {
    this.getList();
    this.idCoordinador = this.route.snapshot.paramMap.get('data');
    this.perm();
  }

  ngOnInit() {}

  listaDB: any = [];
  listaDBnada: any = [];
  listaDBacta: any = [];
  listaDBcancelados: any = [];
  idCoordinador: any = '';

  editable = 'todos';

  cambiarEditableA(){
    this.editable = 'acta' 
  }
  cambiarEditableC(){
    this.editable = 'cancelar' 
  }
  cambiarEditableN(){
    this.editable = 'nada' 
  }
  cambiarEditableT(){
    this.editable = 'todos' 
  }

  // Función para navegar a la página de edición con parámetros
  updateDecision(dat: any) {
    this.router.navigate(['documentos-edit', {
      d: dat.decisionComite,
      idX: dat.idCita,
      ca: dat.correoAprendiz,
      ci: dat.correoInstructor,
      idA: dat.idA,
      aprendiz: dat.aprendiz,
      td: dat.tipoDocumento,
      nt: dat.numeroTI,
      fc: dat.fechaCitacion,
      f: dat.ficha,
      j: dat.jornada,
      p: dat.programa,
      i: dat.instructor,
      n: dat.nota,
      idCoor: this.idCoordinador
    }]);
  }

  // Función para mostrar un alert con la opción de salir
  async salirPagina() {
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
          handler: () => {
            this.router.navigate(['/login']);
          }
        }
      ], mode: 'ios'
    });
    await alert.present();
  }

  // Función para verificar permisos y redirigir si es necesario
  perm() {
    if (this.idCoordinador === '' || this.idCoordinador === null) {
      this.router.navigate(['/login']);
    }
  }

  // Función para mostrar un alert con el título "IUMACO"
  async iumaco() {
    const alert = await this.alertController.create({
      header: 'IUMACO'
    });
    await alert.present();
  }

  // Función para navegar hacia atrás
  volver() {
    this.router.navigate(['/home-coordinador', { data: this.idCoordinador }]);
  }

  // Función para obtener la lista de citaciones desde el servidor
  getList() {
    this.http.get('http://localhost/iumaco_db/getListaCitaciones.php').subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        this.listaDB = response;
        this.listaDBnada = this.listaDB.filter((u: any) => u.decisionComite === null);
        this.listaDBacta = this.listaDB.filter((u: any) => u.decisionComite === 'Acta de condicionamiento');
        this.listaDBcancelados = this.listaDB.filter((u: any) => u.decisionComite === 'Cancelar Matricula');
      },
      (error) => {
        console.error('Error al obtener datos del servidor:', error);
      }
    )
  };
  irPerfil(){this.router.navigate(['/perfil', { data: this.perm }]);}
  CitarComite() {this.router.navigate(['/lista-citados', {data: this.idCoordinador}]);}
}
