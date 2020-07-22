import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NutricionService } from '../services/nutricion.service';
import { MensajesService } from '../services/mensajes.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-alimentos-editar',
  templateUrl: './alimentos-editar.page.html',
  styleUrls: ['./alimentos-editar.page.scss'],
})
export class AlimentosEditarPage implements OnInit {
  dataRecibida:any
  alimentos:any = [];
  alimentos2:any = [];
  alimentos3:any = [];
  datosUsuario:any = [];
  foods: string;
  carbo:any = 0;
  protein:any = 0;
  grasa:any = 0;
  typefoods:number = 1
  totalCarbo: any;
  totalgrease: any;
  totalprotein: any;
  measurement: string = 'gr';
  today:any;
  id:any;
  constructor(private capturar:ActivatedRoute,
              private service: NutricionService,
              private utilities: MensajesService,
              private cdRef: ChangeDetectorRef,
              private navCtrl: NavController) { }

  ngOnInit() {
    //  parametros del id
    this.dataRecibida = this.capturar.snapshot.paramMap.get('id');
    switch (this.dataRecibida) {
      case 'Desayuno':
        this.getFoods(0)
        this.foods = './assets/img/desayuno-grande.jpg'
        break
      case 'Almuerzo':
        this.getFoods(2)
        this.foods = './assets/img/almuerzo-grande.jpg'
        break
      case  'Snack':
        this.getFoods(1)
        this.foods = './assets/img/snack-grande.jpg'
        break
      default:
        this.getFoods(3)
        this.foods = './assets/img/cena-grande.jpg'
        break
    }
  }

  async getFoods(comida:any){
    this.today = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    console.log(this.today)
    const data = await this.service.ListadoComida(comida,this.today)
    if( data == false ){
      this.utilities.notificacionUsuario('Disculpe, Ha ocurrido un error', 'danger')
      }else{
        this.alimentos2 = data['menu'].menu_food 
        this.id = data['menu'].id
      }


    const valor = await this.service.menu(comida);
      if(valor == false ){
      this.utilities.notificacionUsuario('Disculpe, Ha ocurrido un error', 'danger')
      }else{
        console.log(valor)
        this.alimentos = valor['Foods']

        this.alimentos2.forEach(element => {
          this.alimentos.forEach( e => {
            if(e.measure == null){
              e['measurement'] =  'unidad';
            }else{
              e['measurement'] =  'gr';
            }

            if(e.id == element.food_id){
              e.cantidad = parseInt( element.quantity) 
            }

           })
          });

        this.datosUsuario = valor['Menu'];
        this.totalCarbo = this.datosUsuario.carbo;
        this.totalgrease = this.datosUsuario.grease;
        this.totalprotein = this.datosUsuario.protein;
      }


      this.calculateStats()
  }




  ucFirst(str) {
    /*   str = str.replace(/ /g, "."); */
         return str.substring(0, 1).toUpperCase() + str.substring(1); 
     }

      calculateStats(){
        this.carbo = 0;
        this.grasa = 0;
        this.protein = 0;

        
          this.alimentos.forEach(element => {
            
            if(element.cantidad > 0){
              if(element.measurement === 'unidad'){
              console.log(element);
              console.log('medida casera')

              this.carbo += element.carbo*element.cantidad;
              this.grasa += element.greases*element.cantidad;
              this.protein += element.protein*element.cantidad;
            }else{
              this.carbo += this.convertion(1, element.carbo, element.cantidad)
              this.grasa += this.convertion(1, element.greases, element.cantidad)
              this.protein += this.convertion(1, element.protein, element.cantidad)
              console.log(element)
              console.log('Aplicar la regla de 3')

            }
          }
          });
    
      }

      convertion(a, b, c){
        //A es el valor unitario
        //B es el equivalente en grasa/proteina/carbo de ese valor unitario
        //C es la incognita a encontrar
        let x;
        x = b*c/a;
        console.log(x)
        return x;
      }

      progressBar(data, total){
        if((data*100/total)/100 >= 1){
          return 1;
        }else{
          return (data*100/total)/100;
        }
      }

      guardarMenu(){
        let menu = {
          "menu_id" : this.id,
          "day":this.today,
          "type_food": this.datosUsuario.type_food,
          "total_proteins": this.protein,
          "total_greases": this.grasa,
          "total_carbos": this.carbo,
          "total_calories": 0,
          "foods": []
        }

  

        this.alimentos.forEach(element => {
          if(element.cantidad > 0){
            menu.total_calories += element.calories;
            if(element.measurement == 'gr'){//Unidad en gramos, ml, kg etc.
            let food = [ element.id, element.cantidad, element.type_measure]
            menu.foods.push(food);
            }else{//Valor unitario casero.
            let food = [ element.id, element.cantidad]
            menu.foods.push(food);
            }
          }
        });
        console.log(menu)
        if (this.carbo > this.datosUsuario.carbo || this.grasa > this.datosUsuario.grease || this.protein > this.datosUsuario.protein) {
          this.utilities.alertaInformatica('Los alimentos seleccionados exceden los valores permitidos para esta comida')
        } else {
            // evitar guardar vacio
              if(!menu.foods.length){
                this.utilities.alertaInformatica('Debe seleccionar un alimento')
              }else{
                this.service.ActualizarComida(menu).then((res) => {
                  console.log(res);
                  this.utilities.alertaInformatica(this.dataRecibida+ ' Actualizado');
                   this.navCtrl.navigateRoot('/bateria-alimento')
                }).catch((err) => {
                 this.utilities.alertaInformatica('Error al guardar '+ this.dataRecibida)
                });
              }
        }
          
      }



    selecionartarjeta(tipo){

      switch (tipo) {
        case 0:
          this.typefoods = 0
          break;

        case 1:
          this.typefoods = 1
         break;

        case 2:
          this.typefoods = 2
          break;
      
          default:
            break;
      }

    }

    calculador(){

    }

    change(index){
      this.alimentos[index].cantidad = 0;
    }

}
