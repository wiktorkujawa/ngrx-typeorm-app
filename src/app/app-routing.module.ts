import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './modules/admin/admin-layout/admin-layout.component';
import { HomeComponent } from './modules/public/components/pages/home/home.component';
import { PublicLayoutComponent } from './modules/public/public-layout/public-layout.component';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'posts',
        loadChildren: () =>
          import('./modules/public/components/pages/posts/posts.module').then(
            (m) => m.PostsModule
          ),
      },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
