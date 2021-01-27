import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './modules/admin/admin-layout/admin-layout.component';
import { PublicLayoutComponent } from './modules/public/public-layout/public-layout.component';

const routes: Routes = [{
  path: '',
  component: PublicLayoutComponent,
  // children: [
  //  {
  //    path: 'transactions',
  //    loadChildren: () => import('./transaction/transaction.module').then(m => m.TransactionModule)
  //  },
  //  {
  //    path: '', component: AboutPageComponent
  //  }
//  ]
},
{
  path: 'admin',
  component: AdminLayoutComponent,
  // children: [
  //  {
  //    path: 'transactions',
  //    loadChildren: () => import('./transaction/transaction.module').then(m => m.TransactionModule)
  //  },
  //  {
  //    path: '', component: AboutPageComponent
  //  }
//  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
