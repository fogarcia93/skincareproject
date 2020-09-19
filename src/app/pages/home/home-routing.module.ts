import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { PermissionGuard } from 'src/app/guards/permission.guard';
import { HomePage } from './home.page';


const section = 'home';

const routes: Routes = [
  {
    path: '',
    canActivate : [AuthGuard, PermissionGuard],
    component: HomePage, data: { PermissionName: 'admin', Section: section }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
