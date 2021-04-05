import { Body, Controller, Get, Param } from '@nestjs/common';
import { ISessionWrapper } from 'src/middlewares/session.middleware';
import { PostsService } from 'src/services/posts/posts.service';
import { Post } from '../../../../shared/schema/Post';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService
  ) {}

  @Get()
  async home(): Promise<string> {
    return 'Posts home';
  }

  @Get(':id')
  async getPost(
    @Param() params,
    @Body() { userId }: ISessionWrapper<void>
  ): Promise<Post> {
    return this.postsService.getPost(userId, params?.id);
  }
}
