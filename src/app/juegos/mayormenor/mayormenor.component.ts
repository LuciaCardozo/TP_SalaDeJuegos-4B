import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-mayormenor',
  templateUrl: './mayormenor.component.html',
  styleUrls: ['./mayormenor.component.css']
})
export class MayormenorComponent implements OnInit {

  buttons:any = [
    {
      ruta:"/home",
      texto:"Home",
      color:""
    },{
      ruta:"/quienSoy",
      texto:"Quien Soy",
      color:""
      }
  ];
  numeroRandom:number = Math.floor(Math.random() * (13 - 1)) + 1;
  puntosJugador:number = 0;
  mostrarJuego:boolean = false;
  tiempoRestante:number = 10;
  continuarJuego:boolean =false;
  jugar:boolean=false;
  ingreso:number=0;
  constructor(private toastService: ToastService) { }
  
  ngOnInit(): void { }

  seleccionar(opcionSeleccionada:string){
    let numeroAnterior=this.numeroRandom;
    if(opcionSeleccionada == 'mayor'){
      this.numeroRandom = Math.floor(Math.random() * (13 - 1)) + 1;
      if(this.numeroRandom > numeroAnterior){
        this.puntosJugador+=1;
      }else{
        this.toastService.show("Era Menor",{classname:'bg-warning',"delay":"1000"});
      }
      //this.puntosJugador +=1;
    }else{
      this.numeroRandom = Math.floor(Math.random() * (13 - 1)) + 1;
      if(this.numeroRandom < numeroAnterior){
        this.puntosJugador+=1;
      }else{
        this.toastService.show("Era Mayor",{classname:'bg-warning',"delay":"1000"});
      }
    }
  }
  continuarJugando(){
    this.tiempoRestante = 10;
    this.puntosJugador = 0;
    this.continuarJuego = false;
    this.tiempoCorriendo();
  }
  

  tiempoCorriendo(){
    if(this.ingreso==0){
      this.ingreso+=1;
      this.jugar = true;
    }
    this.mostrarJuego=true;
    const intervalo = setInterval(()=>{
      if(this.tiempoRestante==0){
        this.continuarJuego = true;
        this.mostrarJuego=false;
        this.borrarIntervalo(intervalo);
      }else{
        this.tiempoRestante-=1;
      }
    },1000);
  }

  borrarIntervalo(intervalo:any){
    clearInterval(intervalo);
  }
}
