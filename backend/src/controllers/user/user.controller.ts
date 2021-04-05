import { Controller, Get, Body } from '@nestjs/common';
import { ISessionWrapper } from 'src/middlewares/session.middleware';
import { UserService } from 'src/services/user/user.service';
import { User } from '../../../../shared/schema/User';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Get()
  async getUser(
    @Body() { userId }: ISessionWrapper<void>
  ): Promise<User> {
    return this.userService.getUserById(userId);
  }
}
