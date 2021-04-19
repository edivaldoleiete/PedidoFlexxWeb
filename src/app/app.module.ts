import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { TopbarMenuComponent } from './topbar-menu/topbar-menu.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './components/alert/alert.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helpers/jwt-interceptor';
import { ErrorInterceptor } from './helpers/error-interceptor';
import { fakeBackendProvider } from './helpers/fake-backend-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SidebarMenuComponent,
    TopbarMenuComponent,
    PedidosComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ], 
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
