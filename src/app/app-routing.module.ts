import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth-guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { ServicesModule } from './services/services.module';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'pedidos', component: PedidosComponent, canActivate: [AuthGuard] },
  { path: 'produtos', component: ProdutosComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ServicesModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
