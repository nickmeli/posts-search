import { Injectable } from '@nestjs/common';
import { LoginRequest } from '../../../../shared/schema/LoginRequest';
import { User } from '../../../../shared/schema/User';
import { USERS } from '../../data/users.data';

@Injectable()
export class AuthService {
    login(loginRequest: LoginRequest): User {
        const currentUser: User = USERS.find(x => x.username === loginRequest.username && x.password === loginRequest.password);
        return currentUser;
    }
}
