import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NologinGuard } from './guards/nologin.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
      
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
    path: 'product/:id',
    loadChildren: () => import('./pages/product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/user/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'purchase-orders',
    loadChildren: () => import('./pages/purchase-orders/purchase-orders.module').then( m => m.PurchaseOrdersPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'add-product',
    loadChildren: () => import('./pages/add-product/add-product.module').then( m => m.AddProductPageModule)
  },
  {
    path: 'invoice',
    loadChildren: () => import('./pages/invoice/invoice.module').then( m => m.InvoicePageModule)
  },
  {
    path: 'orders-main',
    loadChildren: () => import('./pages/orders-main/orders-main.module').then( m => m.OrdersMainPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
