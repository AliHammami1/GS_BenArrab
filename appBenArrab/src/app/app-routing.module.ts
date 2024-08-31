import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './modules/auth/guards/auth.guard';
import { DefaultLayoutComponent } from './core/default-layout/default-layout.component';
//import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/auth/login/login.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // },


  {
    path: '',
    component: DefaultLayoutComponent,
    // canActivate: [authGuard],
    canActivate: [authGuard] ,
    data: {
      title: 'Login'
    },
    children: [
      {path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m =>m.DashboardModule ), canActivate: [authGuard] },
      {path: 'produit', loadChildren: () => import('./modules/produit/produit.module').then(m =>m.ProduitModule ) , canActivate: [authGuard]  },
      {path: 'gestionnaire', loadChildren: () => import('./modules/gestionnaire/gestionnaire.module').then(m =>m.gestionnaireModule ) , canActivate: [authGuard]  },
      {path: 'depot', loadChildren: () => import('./modules/depot/depot.module').then(m =>m.depotModule ) , canActivate: [authGuard]  },
      {path: 'lignedep/:id', loadChildren: () => import('./modules/ligne-dep/ligne-dep.module').then(m =>m.lignedepModule ) , canActivate: [authGuard] },

    ]
  },
  {
    path: 'login',
    pathMatch:'full', // ma tafichihouli ken kif ma yebdaa maktoub members
    component:LoginComponent,
    data: {
      title: 'Login Page'
    }
  },

  // {
  //   path: 'dashboard',
  //   // canActivate: [authGuard],
  //   component: DashboardComponent,
  //   data: {
  //     title: 'Acceuil'
  //   }
  //  },


  { // rederection ll login  kif fi vid /
    path: '',
    pathMatch:'full', // ma tafichihouli ken kif ma yebdaa path fera8
    redirectTo:"login" // bech ki yodkol yhezni ll login
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
