import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultLayoutModule } from './core/default-layout/default-layout.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { LoginComponent } from './modules/auth/login/login.component';
import { SharedAppModule } from './core/shared/shared.module';
import { FeatureGuard } from './core/permission/guards/feature.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/shared/interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { ProduitModule } from './modules/produit/produit.module';


import { gestionnaireModule } from './modules/gestionnaire/gestionnaire.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DefaultLayoutModule,
    DashboardModule,
    SharedAppModule,
    BrowserAnimationsModule,
    NgbModule,
    MatCardModule,
    MatTableModule,

    ProduitModule,

    gestionnaireModule
  ],
  providers: [
    FeatureGuard,
    // {
    //   provide: LocationStrategy,
    //   useClass: HashLocationStrategy
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
