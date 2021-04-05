import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/components/login/login.component';
import { SiteLayoutComponent } from './features/layouts/site-layout/site-layout.component';
import { PostDetailsComponent } from './features/posts/components/post-details/post-details.component';
import { SearchComponent } from './features/posts/components/search/search.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'details',
        component: PostDetailsComponent,
      },
      {
        path: '',
        component: SearchComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
