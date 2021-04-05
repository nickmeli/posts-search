import { Injectable } from '@nestjs/common';
import { User } from '../../../../shared/schema/User';

@Injectable()
export class SessionService {
  encodeSid(user: User): string {
    const userString: string = JSON.stringify(user);
    return Buffer.from(userString).toString('base64');
  }

  decodeSid(sid: string): User {
    const buffer: Buffer = Buffer.from(sid, 'base64');
    const userString: string = buffer.toString('ascii');
    return JSON.parse(userString);
  }
}
