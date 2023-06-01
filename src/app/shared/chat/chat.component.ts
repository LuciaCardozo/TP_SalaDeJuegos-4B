import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DataBaseService } from 'src/app/services/dataBase/data-base.service';
import { ScrollToBottomDirective } from 'src/app/scroll-to-bottom.directive';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  styles: [
    `
    :host {
      font-size: 2em;
    }

    .my-list {
      overflow: auto;
    }
    `,
  ],
})
export class ChatComponent implements OnInit {

  @ViewChild(ScrollToBottomDirective)
  scroll?: ScrollToBottomDirective;
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
