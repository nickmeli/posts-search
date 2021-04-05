import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { MainConfig } from 'src/MainConfig';
import { Post } from '../../../../../shared/schema/Post';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class PostsService extends ApiService {

  constructor(
    private readonly http: HttpClient,
    cookieService: CookieService,
  ) {
    super(cookieService);
  }

  getPost(postId: string): Observable<Post> {
    return this.http.get<Post>(
      `${MainConfig.API_URL}/posts/${postId}`,
      this.getAuthenticatedOptions(),
    );
  }
}
