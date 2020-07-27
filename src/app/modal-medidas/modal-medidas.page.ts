import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-medidas',
  templateUrl: './modal-medidas.page.html',
  styleUrls: ['./modal-medidas.page.scss'],
})
export class ModalMedidasPage implements OnInit {
  @Input() nombre;
  image: string;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    switch (this.nombre) {
      case 'Cintura minima':
        this.image = './assets/img/cintura_minima.jpg'
        break
      case 'Cintura maxima':
        this.image = './assets/img/cintura_maxima.jpg'
        break
      case  'Cadera':
        this.image = './assets/img/snack-grande.jpg'
        break
      case  'Cuello':
        this.image = './assets/img/cuello.jpg'
        break
      case  'Muslo derecho':
        this.image = './assets/img/muslo_derecho.jpg'
        break
      case  'Muslo izquierdo':
        this.image = './assets/img/muslo_izquierdo.jpg'
        break
      case  'Brazo derecho':
        this.image = './assets/img/brazo_relajado_derecho.jpg'
        break
      case  'Brazo izquierdo':
        this.image = './assets/img/brazo_relajado_izquierdo.jpg'
        break
      case  'Pantorrilla derecho':
        this.image = './assets/img/pantorrilla_derecha.jpg'
        break
      case  'Pantorrilla izquierda':
        this.image = './assets/img/pantorrilla_izquierda.jpg'
        break

      case  'Torax':
        this.image = './assets/img/pecho.jpg'
        break

      default:
        break
    }
    console.log(this.nombre)
  }

  salir(){
    this.modalController.dismiss()
  }

}
