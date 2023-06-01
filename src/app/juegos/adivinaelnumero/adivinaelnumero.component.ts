import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-adivinaelnumero',
  templateUrl: './adivinaelnumero.component.html',
  styleUrls: ['./adivinaelnumero.component.css']
})
export class AdivinaelnumeroComponent implements OnInit {
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
  numeroSecreto:any;
  numeros:any = new Set();
  botonesNumeros:Array<{numero:number,estado:string}> = [];
  vida:number= 10;
  puntos:number = 0;
  comenzar = true;
  continuarJuego=false;
  intentos:number = 0;

  constructor() { }

  ngOnInit(): void {
  }
  //creo dos variables, una para el numero random y la otra para guardar
  //los numeros desordenados
  mezcladorNumerosRandom(){
    this.comenzar = false;
    this.numeroSecreto = 0;
    let numeroRandom:number;
    let numerosArray:any = [];
    this.botonesNumeros = [];
    while(this.numeros.size < 10){
      numeroRandom = Math.floor(Math.random() * (11 - 1)) + 1;//cargo un numero random
      this.numeros.add(numeroRandom);//lo añado con add de la propiedad set-con esa propiedad prevengo que el numero se repita
    }
    this.numeros.forEach((element:any) => {//recorro los numeros setteados
      numerosArray.push(element);//y lo guardo en mi array de numeros
    });
    this.numeroSecreto = numerosArray.sort(function() { return Math.random() - 0.5 });//lo desordono
    this.numeroSecreto = numerosArray[2];//tomo el numero que se encuentra en el indice dos como numero secreto
    console.log(this.numeroSecreto)
    console.log(this.numeroSecreto);
    numerosArray.sort(function() { return Math.random() - 0.5 });
    numerosArray.forEach((element:any) => {
      this.botonesNumeros.push({numero:element, estado:"btn-no-pulsado"});
    });
    return this.botonesNumeros;
    //console.log(numerosArray);
  }
 
  continuarConElJuego(){
    this.continuarJuego = false;
    this.vida = 10;
    this.puntos = 0;
    this.mezcladorNumerosRandom();
  }

  numeroClickeado(boton:{numero:number, estado:string}){
    if( boton.numero == this.numeroSecreto){
      if(this.intentos == 0){
        this.vida += 3;
        this.puntos++;
        boton.estado = "btn-letra-acertada";
        //console.log(this.vida);
        setTimeout(() => {        
          this.mezcladorNumerosRandom();
        }, 500);
      } else if (this.intentos == 1){
        this.vida += 2;
        this.puntos++;
        this.intentos = 0;
        //console.log(this.vida);
        boton.estado = "btn-letra-acertada";
        setTimeout(() => {        
          this.mezcladorNumerosRandom();
        }, 500);
      } else {
        this.vida++;
        this.puntos++;
        this.intentos = 0;
        //console.log(this.vida);
        boton.estado = "btn-letra-acertada";
        setTimeout(() => {        
          this.mezcladorNumerosRandom();
        }, 500);
      }
    } else {
      if(this.vida > 0){
        this.intentos++;
        this.vida--;
        boton.estado = "btn-letra-no-acertada";
        //console.log(this.vida);
      } else {
        this.continuarJuego = true;
      }
    }
  }
 
}