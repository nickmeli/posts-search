import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './controllers/auth/auth.controller';
import { PostsController } from './controllers/posts/posts.controller';
import { UserController } from './controllers/user/user.controller';
import { SessionMiddleware } from './middlewares/session.middleware';
import { AuthService } from './services/auth/auth.service';
import { PostsService } from './services/posts/posts.service';
import { SessionService } from './services/session/session.service';
import { UserService } from './services/user/user.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    AuthController,
    PostsController,
    UserController,
  ],
  providers: [
    AppService,
    AuthService,
    PostsService,
    SessionService,
    UserService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SessionMiddleware)
      .forRoutes(
        'posts',
        'user'
      );
  }
}
