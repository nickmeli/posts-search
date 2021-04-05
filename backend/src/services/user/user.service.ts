import { Injectable } from '@nestjs/common';
import { User } from '../../../../shared/schema/User';
import { USERS } from '../../data/users.data';

@Injectable()
export class UserService {
  getUserById(userId: number): User {
    return USERS.find(x => x.id == userId);
  }
}
