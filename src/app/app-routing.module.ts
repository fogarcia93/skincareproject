import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NologinGuard } from './guards/nologin.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule) ,
    canActivate : [AuthGuard]  
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/user/login/login.module').then( m => m.LoginPageModule),
    canActivate : [NologinGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/user/register/register.module').then( m => m.RegisterPageModule),
    canActivate : [NologinGuard]
  },
  {
    path: 'product-detail',
    loadChildren: () => import('./pages/productDetail/product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/user/profile/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
