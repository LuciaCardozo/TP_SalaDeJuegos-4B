import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {

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

  readonly letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
    "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

  readonly palabras = ["CARACOLA", "TOCINA", "BARCELONA","ESTRELLA","CARGADOR","CUADRO"];
  mensaje:string = "";
  palabraAdivinarPorAhora: string = "";
  palabraAAdivinar: any = "";
  fallos: Array<string> = [];
  numFallos:number = 1;
  numAcierto:number = 0;
  letrasAcertadas: any = [];
  popup:any;
  botones: Array<{letra:string,estado:string}> = [];

  constructor() {
    this.inicializar();
  }

  continuarJugando(){
    this.popup.style.display = "none";
    this.inicializar();
  }

  ngOnInit(): void {
    this.popup = document.getElementById('popup');
  }

  inicializar() {
    this.palabraAdivinarPorAhora = "";
    this.fallos = [];
    this.botones = [];
    this.numFallos = 1;
    this.numAcierto = 0;
    let numero: number = Math.floor(Math.random() * this.palabras.length);
    this.palabraAAdivinar = this.palabras[numero];
    this.generarPalabraAdivinarPorAhora();
    this.inicializarBotones();
  }

  inicializarBotones(){
    for (let i = 0 ; i < this.letras.length ; i++){
      this.botones.push({letra:this.letras[i],estado:"btn-no-pulsado"});
    }
  }

  generarPalabraAdivinarPorAhora() {
    for (let i = 0; i < this.palabraAAdivinar.length; i++) {
      this.palabraAdivinarPorAhora += "-";
    }
  }

  botonClicked(boton:{letra:string,estado:string}) {
    if (!this.agregarLetraAcertada(boton.letra)) {
      if (this.numFallos < 7) {
        this.aumentarFallo(boton.letra);
        boton.estado = "btn-letra-no-acertada";
      } else {
        this.mensaje = "Perdiste!!";
        this.popup.style.display = "initial";
        //this.mostrarMensajeDePerder();
      }
    } else {
      if(this.numAcierto == this.palabraAAdivinar.length){
        this.mensaje = " Ganaste la palabra era "+this.palabraAAdivinar+"!!";
        this.popup.style.display = "initial";
      }
      boton.estado = "btn-letra-acertada";
    }
  }

  agregarLetraAcertada(letra: string) {
    let ret = false;
    let longitud = this.palabraAAdivinar.length;
    for (let i = 0; i < longitud; i++) {
      if (letra == this.palabraAAdivinar[i]) {
        this.palabraAdivinarPorAhora = (i == 0 ? "" : this.palabraAdivinarPorAhora.substr(0, i)) +
          letra +
          this.palabraAdivinarPorAhora.substr(i + 1);
          ret = true;
          this.numAcierto++;
        }
    }
    return ret;
  }

  letraAcertada(letra: string) {
    return this.palabraAAdivinar.includes(letra);
  }

  aumentarFallo(letra: string) {
    this.fallos.push(letra);
    this.numFallos++;
  }

}
