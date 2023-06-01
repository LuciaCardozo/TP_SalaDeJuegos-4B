import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AdivinaelnumeroComponent } from './adivinaelnumero/adivinaelnumero.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayormenorComponent } from './mayormenor/mayormenor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';

const routes: Routes = [{path:"ahorcado",component:AhorcadoComponent,canActivate:[AuthGuard]},
{path:"mayorOMenor",component:MayormenorComponent,canActivate:[AuthGuard]},
{path:"adivinaElNumero",component:AdivinaelnumeroComponent,canActivate:[AuthGuard]},
{path:"preguntados",component:PreguntadosComponent,canActivate:[AuthGuard]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
