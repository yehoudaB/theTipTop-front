import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { BigPrizeComponent } from './big-prize/big-prize.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { LotComponent } from './lot/lot.component';
import { TicketComponent } from './ticket/ticket.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', component: AuthComponent, canActivate: [AuthGuard]},
  { path: 'lots', component: LotComponent, canActivate: [AuthGuard] },
  { path: 'tickets', component: TicketComponent, canActivate: [AuthGuard] },
  { path: 'big-prize', component: BigPrizeComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
