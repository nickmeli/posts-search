import { HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";

export class ApiService {
  constructor(
    private readonly cookieService: CookieService,
  ) {}
  
  protected getAuthenticatedOptions(): {
    headers?: HttpHeaders;
  } {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Authorization', `Bearer ${this.cookieService.get('posts-sid')}`);
    return {
      headers,
    }
  }
}
