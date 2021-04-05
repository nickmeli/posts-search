import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly cookieService: CookieService,
  ) {}

  /**
   * Is invoked for each nested route protected by this guard
   */
  canActivate(): boolean {
    console.log('AuthGuard:canActivate');
    if (!!this.cookieService.get('posts-sid')) {
      return true;
    } else {
      console.log('========= Navigate to login')
      this.router.navigate(['/login']);
      return false;
    }
  }
}