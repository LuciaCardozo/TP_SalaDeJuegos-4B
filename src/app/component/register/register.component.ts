import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataBaseService } from 'src/app/services/dataBase/data-base.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  botones:any = [
    {
    ruta:"/login",
    texto:"Login",
    color:"#20afb4"
    }
  ]
  listaDeCorreos:any = [];
  usuario = {
    email: '',
    password: ''
  };

  constructor(
    private database:DataBaseService, 
    private router:Router,
    private toastService: ToastService){}

  async ngOnInit(){
    const res = await this.database.traerTodo('users');
    res?.subscribe((listaref:any) => {
      this.listaDeCorreos = listaref.map((userRef:any) => userRef.payload.doc.data());
    });
  }

  darDeAlta() {
    let aux = this.usuario;
    let existe = this.listaDeCorreos.find((email: any) => email.email == aux.email);
      if (!existe && aux.email != "" && aux.password != "") {
        this.database.onRegister(this.usuario.email,this.usuario.password).then(() => {
          this.database.alta('users', this.usuario);
          this.database.emailUsuarioLogeado = this.usuario.email;
          setTimeout(() => {        
            this.router.navigateByUrl('/home');
          }, 200);
          this.toastService.show("Alta exitosa", {classname:'bg-success', "delay":"2000"});
        });
      }else if(aux.email=="" || aux.password == ""){
        this.toastService.show("Por favor complete los datos pedidos",{classname:'bg-warning', "delay":"2000"});
      }else{
        this.toastService.show("Ya existe usuario",{classname:'bg-danger', "delay":"2000"});
      }
  }

  test() {
    let aux;
    this.database.traerTodo('users')
      .then((res) => {
        res?.subscribe((respuestas) => {
          respuestas.forEach((respuesta) => {
            let user: any = respuesta.payload.doc.data();
            //user["id"]=respuesta.payload.doc.id;
            aux = user.email;
            console.log(aux);
          });
        });
      });
  }

}
