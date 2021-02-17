import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { AdminGuard } from '../../@core/guards/admin.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivateChild: [AdminGuard],
    children: [
      {path: '',
       loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {path: 'users',
      loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
       },
       {path: 'genres',
       loadChildren: () => import('./genres/genres.module').then(m => m.GenresModule),
        },
        {path: 'tags',
        loadChildren: () => import('./tags/tags.module').then(m => m.TagsModule),
         },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
