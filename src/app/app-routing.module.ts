import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { HomeComponent } from './pages/home/home.component';
import { ImpostoComponent } from './pages/imposto/imposto.component';
import { LoginComponent } from './pages/login/login.component';
import { NovaConsultaComponent } from './pages/nova-consulta/nova-consulta.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'imposto', component: ImpostoComponent, canActivate: [AuthGuard] },
  { path: 'consulta', component: ConsultaComponent, canActivate: [AuthGuard] },
  { path: 'nova-consulta', component: NovaConsultaComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', component: HomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
