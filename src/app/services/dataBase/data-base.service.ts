  import { Injectable } from '@angular/core';
  import { AngularFirestore } from '@angular/fire/compat/firestore';
  import { AngularFireAuth } from '@angular/fire/compat/auth';
  import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {
  public emailUsuarioLogeado: any;
  public isLogged: any = false;

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => this.isLogged = user);//en el caso de no estar logueado devuelve un null
  }

  async alta(coleccion: any, dato: any) {
    try {
      return await this.firestore.collection(coleccion).add(dato);
    }
    catch (error) {
      alert(error);
      return null;
    }
  }
  //LOGIN
  async onLogin(email: string, password: string) {
    try {
      return await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log("Error on login", error);
      return error;
    }
  }

  async onLoginWinthGoogle() {
    try {
      return await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (error) {
      console.log("Error on login", error);
      return error;
    }
  }
  //REGISTER
  async onRegister(email: string, password: string) {
    try {
      return await this.afAuth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log("Error on register", error);
      return error;
    }
  }
  //
  async traerTodo(coleccion: any) {
    try {
      return await this.firestore.collection(coleccion).snapshotChanges();
    }
    catch (error) {
      alert(error);
      return null;
    }
  }
}