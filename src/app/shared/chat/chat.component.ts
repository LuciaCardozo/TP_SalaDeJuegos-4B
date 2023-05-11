import { Component, Input, OnInit } from '@angular/core';
import { DataBaseService } from 'src/app/services/dataBase/data-base.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  mostrarChat=false;
  @Input() nombreJuego:any;
  lista:any = [];
  @Input() data:any;
  nuevoMensaje = {
    emisor: "",
    mensaje : "",
    horario: Date.now()
  };
  usuarioActual:any;
  mensaje:any;
  constructor(private database:DataBaseService) {}

  mensajeChat(){
    this.nuevoMensaje = {
      emisor: this.usuarioActual,
      mensaje : this.mensaje,
      horario: Date.now()
    }
    //alert(JSON.stringify(this.nuevoMensaje));
    this.database.alta(this.data, this.nuevoMensaje);
    this.mensaje = "";
  }

  async ngOnInit() {
    this.usuarioActual = this.database.emailUsuarioLogeado;
    try{
      const res = await this.database.traerTodo(this.data);
      res?.subscribe((listaref:any) => {
      this.lista = listaref.map((userRef:any) => userRef.payload.doc.data());
      //Lo ordeno por date
      return this.lista.sort((a:any, b:any) => new Date(a.horario).getTime() - new Date(b.horario).getTime());
     });
    }catch(error){
      console.log("nose pudo subscribir la lista",error);
    }
  }

}
