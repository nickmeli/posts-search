import { Injectable } from '@angular/core';
import { MainConfig } from '../../../MainConfig';
import { LoginRequest, LoginResponse } from '../../../../../shared/schema/LoginRequest';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../../../shared/schema/User';
import { ApiService } from 'src/app/core/services/api.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService extends ApiService {
  constructor(
    private readonly http: HttpClient,
    cookieService: CookieService,
  ) {
    super(cookieService);
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${MainConfig.API_URL}/auth/login`,
      loginRequest
    );
  }

  loadUser(): Observable<User> {
    return this.http.get<User>(
      `${MainConfig.API_URL}/user`,
      this.getAuthenticatedOptions(),
    );
  }
}
