import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { LotComponent } from './lot/lot.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'authenticate',  canActivate: [AuthGuard]},
  { path: 'lots', component: LotComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
