import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataBaseService } from 'src/app/services/dataBase/data-base.service';

@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrls: ['./quien-soy.component.css']
})
export class QuienSoyComponent implements OnInit {
  buttons:any = [{
    ruta:"/home",
    texto:"← Volver",
    color:""
    }
  ];
  email:string = "name";
  name?:string;
  constructor(private router:Router, private database:DataBaseService) { }

  ngOnInit(): void {
    this.email = this.database.emailUsuarioLogeado;
    this.name = this.email.split('@')[0].charAt(0).toUpperCase()+
      this.email.split('@')[0].substr(1).toLowerCase();
  }
  onLogout(){
    //this.afAuth.signOut();
    this.router.navigateByUrl('/login');
  }

}
