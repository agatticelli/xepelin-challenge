import { User } from '../entity/user.entity';

export class UserMapper {
  static fromPersistence(data: any): User {
    return new User({
      username: data.pk.split('#')[1],
      password: data.password,
    });
  }

  static toPersistence(user: User): any {
    return {
      pk: `USER#${user.username}`,
      sk: `USER#${user.username}`,
      password: user.password,
    };
  }
}
