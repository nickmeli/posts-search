import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../../../../../../shared/schema/Post';
import { PostsFacade } from '../../store/posts.facade';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  postTitle: string | undefined;
  postBody: string | undefined;

  constructor(
    private readonly postsFacade: PostsFacade,
    private readonly router: Router,
  ) {
    let post: Post | undefined = this.postsFacade.getCurrentPost();
    this.postTitle = post?.title;
    this.postBody = post?.body;
  }

  ngOnInit(): void {
  }

  getPost(): void {
    this.postsFacade.getCurrentPost();
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }
}
