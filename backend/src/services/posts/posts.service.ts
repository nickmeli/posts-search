import { Injectable } from '@nestjs/common';
import { Post } from '../../../../shared/schema/Post';
import { POSTS_DATASET } from '../../data/posts.data';

@Injectable()
export class PostsService {
  getPost(userId: number, postId: number): Post {
    return POSTS_DATASET.find(x => x.userId === userId && x.id == postId);
  }
}
