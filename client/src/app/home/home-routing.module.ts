import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthComponent } from '../pages/auth/auth.component';
import { AuthGuard } from '../core/auth/auth.guard';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { CreateCardComponent } from '../pages/create-card/create-card.component';
import { BrowseCardsComponent } from '../pages/browse-cards/browse-cards.component';
import { CollectionsComponent } from '../pages/collections/collections.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      { path: 'auth', component: AuthComponent },
      {
        path: 'createcard',
        component: CreateCardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'browsecards',
        component: BrowseCardsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'collections',
        component: CollectionsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
