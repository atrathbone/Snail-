import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthComponent } from '../pages/auth/auth.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [{ path: '', component: AuthComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
