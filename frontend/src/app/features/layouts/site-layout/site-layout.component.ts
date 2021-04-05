import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { User } from '../../../../../../shared/schema/User';
import { AuthFacade } from '../../auth/store/auth.facade';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit, OnDestroy {
  faHome = faHome;
  constructor(
    private readonly authFacade: AuthFacade,
    private readonly router: Router,
  ) { }

  ngOnDestroy(): void {
    if (!!this.subscriptions) {
      this.subscriptions.unsubscribe()
    }
  }

  userText: string = '';
  subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    const user: User | undefined = this.authFacade.getUser();
    if (!!user) {
      this.userText = `Welcome ${user.first_name}, ${user.last_name}`
    } else {
      this.subscriptions.add(this.authFacade.currentUser$.subscribe((user: User | undefined) => {
        if (!!user) {
          this.userText = `Welcome ${user.first_name}, ${user.last_name}`
        }
      }));
      this.authFacade.loadUser();
    }
  }

  logout(): void {
    this.authFacade.logout();
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }
}
