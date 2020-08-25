import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { MensajesService } from '../services/mensajes.service';
import { NutricionService } from '../services/nutricion.service';

@Component({
  selector: 'app-progreso',
  templateUrl: './progreso.page.html',
  styleUrls: ['./progreso.page.scss'],
})
export class ProgresoPage implements OnInit {

  constructor( private ruta: NavController,
              private service: NutricionService,
              public loadingController: LoadingController,
              private utilities: MensajesService) { }

  ngOnInit() {
    // this.getResume()
  }


  devolver(){
    this.ruta.navigateForward([`/tabs/dashboard`])
  }


  async getResume(){
      this.presentLoading() 
       const valor = await this.service.historyMeasures()
       if(valor == false ){
        this.loadingController.dismiss() 
       this.utilities.notificacionUsuario('Disculpe, Ha ocurrido un error', 'danger')
       }else{
        this.loadingController.dismiss() 
          console.log(valor)
       }
         
   }

   async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Por favor espere...',
    });
    await loading.present();
  }


}
