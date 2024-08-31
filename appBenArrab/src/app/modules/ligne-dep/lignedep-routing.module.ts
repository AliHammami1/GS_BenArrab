import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LigneDepComponent } from './ligne-dep.component';

const routes: Routes = [{ path: '', component: LigneDepComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class lignedepRoutingModule {}