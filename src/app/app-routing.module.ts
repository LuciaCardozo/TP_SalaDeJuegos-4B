import { NgModule } from '@angular/core';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { ErrorComponent } from './component/error/error.component';
import { RouterModule, Routes } from '@angular/router';
import { QuienSoyComponent } from './component/quien-soy/quien-soy.component';
import { RegisterComponent } from './component/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:"",redirectTo:"login",pathMatch:"full"},
  {path:"login",component:LoginComponent},
  {path:"quienSoy",component:QuienSoyComponent,canActivate:[AuthGuard]},
  {path:"register",component:RegisterComponent},
  {path:"home",component:HomeComponent,canActivate:[AuthGuard]},
  {path:"juegos",loadChildren:() => import('./juegos/juegos.module').then(m => m.JuegosModule)},
  {path:'**',component:ErrorComponent}
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
