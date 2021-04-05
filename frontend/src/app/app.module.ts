import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './features/auth/auth.module';
import { PostsModule } from './features/posts/posts.module';
import { PostsStoreModule } from './features/posts/store/posts-store.module';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './core/guards/auth.guard';
import { SiteLayoutComponent } from './features/layouts/site-layout/site-layout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    PostsModule,
    NgbModule,
    PostsStoreModule,
    FontAwesomeModule,
  ],
  providers: [
    CookieService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
