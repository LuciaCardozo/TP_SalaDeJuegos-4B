import { Component, OnInit } from '@angular/core';
import { DataBaseService } from 'src/app/services/dataBase/data-base.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {
  buttons: any = [
    {
      ruta: "/home",
      texto: "Home",
      color: ""
    }, {
      ruta: "/quienSoy",
      texto: "Quien Soy",
      color: ""
    }
  ];
  continuarJuego: boolean = false;
  lista: any = [];
  preguntaYRepuesta:any;
  indexRandom = Math.floor(Math.random() * (4 - 0)) + 0;
  esCorrecta:boolean = false;
  repuestas:any;
  respuestaDesordenada:any;
  puntos:number=0;
  puntosFallados:number=0;
  index: number = 0;
  constructor(private database: DataBaseService) { 
  }

  ngOnInit() {
    this.mostrarPreguntaYMezclar();
  }

 
  async mostrarPreguntaYMezclar(){
    const res = await this.database.traerTodo('preguntaYRepuesta');
    let desordenar:any = [];
    //let indexRandom = 0//Math.floor(Math.random() * (4 - 0)) + 0;
    res?.subscribe((listaref: any) => {
      this.lista = listaref.map((userRef: any) => userRef.payload.doc.data());
      console.log(this.index)
        if(this.index != 4) {
          this.preguntaYRepuesta = this.lista[this.index];
          this.repuestas = this.lista[this.index].respuestas;
          //.sort(function() { return Math.random() - 0.5 });
          this.repuestas.forEach((element:any) => {
            desordenar.push(element);
          });
          this.respuestaDesordenada=this.shuffle(desordenar);
        }
      else{
        this.continuarJuego = true
        console.log('fin')
      }
     
      
    });
  }

  cambiarColor(boton:{correcta:boolean,estado:string}, dato: any){
    dato.seSelecciono = true;
    console.log(dato.pregunta)
    if(boton.correcta){
      this.esCorrecta = true;
      boton.estado='btn-letra-acertada';
      setTimeout(() => {        
        this.index = this.index+1;
        this.mostrarPreguntaYMezclar();
        this.puntos++;
      }, 500);
    }else{
      this.esCorrecta = false;
      boton.estado='btn-letra-no-acertada';
      setTimeout(() => { 
        this.index = this.index+1;       
        this.mostrarPreguntaYMezclar();
        this.puntosFallados++;
      }, 500);
    }
  }

  shuffle(arr:any) {
    var i,
        j,
        temp;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;    
  };

}
