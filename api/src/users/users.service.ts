import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.find(username);
  }

  async create(username: string, password): Promise<void> {
    const user = await this.userRepository.find(username);
    if (user) {
      throw new BadRequestException('User already exists');
    }

    const newUser = new User({
      username,
      password,
    });

    await this.userRepository.create(newUser);
  }
}
