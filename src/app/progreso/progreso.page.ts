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

  comparar:any = 'perfil'
  clase:string = 'perfil'
  valor: any;
  valor2: any;
  fechas:any
  medidas_ante = {
    min_waist: null,
    max_waist:null,
    hip:null,
    neck:null,
    right_thigh:null,
    left_thigh:null,
    right_arm:null,
    left_arm:null,
    right_arm_flexed:null,
    left_arm_flexed:null,
    right_calf:null,
    left_calf:null,
    torax:null,
    waist_hip:null,
    profile_photo:null,
    front_photo:null,
    back_photo:null,
  }
  medidas_despues = {
    min_waist: null,
    max_waist:null,
    hip:null,
    neck:null,
    right_thigh:null,
    left_thigh:null,
    right_arm:null,
    left_arm:null,
    right_arm_flexed:null,
    left_arm_flexed:null,
    right_calf:null,
    left_calf:null,
    torax:null,
    waist_hip:null,
    profile_photo:null,
    front_photo:null,
    back_photo:null,
  }


  constructor( private ruta: NavController,
              private service: NutricionService,
              public loadingController: LoadingController,
              private utilities: MensajesService) { }

  ngOnInit() {
    this.getResume()
  }


  devolver(){
    this.ruta.navigateForward([`/tabs/dashboard`])
  }


  async getResume(){
      this.presentLoading() 
       const valor:any = await this.service.historyMeasures()
       if(valor == false ){
        this.loadingController.dismiss() 
       this.utilities.notificacionUsuario('Disculpe, Ha ocurrido un error', 'danger')
       }else{
        this.loadingController.dismiss() 
         console.log(valor)
         this.fechas = valor
       }
         
   }

   async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Por favor espere...',
      cssClass: 'my-loading',
    });
    await loading.present();
  }



  
  segmentChanged(valor){
    this.clase = valor.target.value
    this.comparar = valor.target.value
    this.valor = null
    this.valor2 = null
    for (var key in this.medidas_ante ) {
      this.medidas_ante[key] = null;
    }

    for (var key in this.medidas_despues ) {
      this.medidas_despues[key] = null;
    }

  }


  desde(valor){
    console.log(valor.target.value)
    this.valor = valor.target.value;
    this.buscador(this.valor,"ante")
  }

  hasta(valor){
    console.log(valor.target.value)
    this.valor2 = valor.target.value;
    this.buscador(this.valor2,"despues")
  }

  buscador(valor, filtrar){
    const resultado = this.fechas.find( elemento => elemento.id === parseInt(valor) );
    console.log(resultado);
    if(filtrar === "ante"){
      this.medidas_ante.min_waist = resultado.min_waist,
      this.medidas_ante.max_waist = resultado.max_waist,
      this.medidas_ante.hip = resultado.hip,
      this.medidas_ante.neck = resultado.neck,
      this.medidas_ante.right_thigh = resultado.right_thigh,
      this.medidas_ante.left_thigh = resultado.left_thigh,
      this.medidas_ante.right_arm = resultado.right_arm,
      this.medidas_ante.left_arm = resultado.left_arm,
      this.medidas_ante.right_arm_flexed = resultado.right_arm_flexed,
      this.medidas_ante.left_arm_flexed = resultado.left_arm_flexed,
      this.medidas_ante.right_calf = resultado.right_calf,
      this.medidas_ante.left_calf = resultado.left_calf,
      this.medidas_ante.torax = resultado.torax,
      this.medidas_ante.profile_photo = resultado.profile_photo,
      this.medidas_ante.front_photo = resultado.front_photo,
      this.medidas_ante.back_photo = resultado.back_photo
    }else{
      this.medidas_despues.min_waist = resultado.min_waist,
      this.medidas_despues.max_waist = resultado.max_waist,
      this.medidas_despues.hip = resultado.hip,
      this.medidas_despues.neck = resultado.neck,
      this.medidas_despues.right_thigh = resultado.right_thigh,
      this.medidas_despues.left_thigh = resultado.left_thigh,
      this.medidas_despues.right_arm_flexed = resultado.right_arm_flexed,
      this.medidas_despues.right_arm = resultado.right_arm,
      this.medidas_despues.left_arm = resultado.left_arm,
      this.medidas_despues.left_arm_flexed = resultado.left_arm_flexed,
      this.medidas_despues.right_calf = resultado.right_calf,
      this.medidas_despues.left_calf = resultado.left_calf,
      this.medidas_despues.torax = resultado.torax,
      this.medidas_despues.profile_photo = resultado.profile_photo,
      this.medidas_despues.front_photo = resultado.front_photo,
      this.medidas_despues.back_photo = resultado.back_photo
    }

  }


}
