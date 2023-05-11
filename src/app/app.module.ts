import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { QuienSoyComponent } from './component/quien-soy/quien-soy.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './component/error/error.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TitleDecorationComponent } from './shared/title-decoration/title-decoration.component';
import { ToastComponent } from './shared/toast/toast.component';
import { AngularFireModule } from '@angular/fire/compat';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RegisterComponent } from './component/register/register.component';
import { CommonModule } from '@angular/common';
import { JuegosRoutingModule } from './juegos/juegos-routing.module';
import { AhorcadoComponent } from './juegos/ahorcado/ahorcado.component';
import { MayormenorComponent } from './juegos/mayormenor/mayormenor.component';
import { ChatComponent } from './shared/chat/chat.component';

const firebaseConfig = {
  apiKey: "AIzaSyDFS-2rJTcwby8d9K0PY6cw82haLpsfKOQ",
  authDomain: "scenic-setup-298622.firebaseapp.com",
  projectId: "scenic-setup-298622",
  storageBucket: "scenic-setup-298622.appspot.com",
  messagingSenderId: "645397347517",
  appId: "1:645397347517:web:7e5290e77b6530c9484bd4"
};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    QuienSoyComponent,
    ErrorComponent,
    TitleDecorationComponent,
    ToastComponent,
    NavbarComponent,
    RegisterComponent,
    AhorcadoComponent,
    MayormenorComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    JuegosRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
