import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  createUser = async (data: CreateUserDto) => {
    const newUser = this.userRepository.create(data);
    return await this.userRepository.save(newUser);
  };

  findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: {
        email: true,
        createdAt: true,
      },
      order: {
        createdAt: 1,
      },
    });
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        id,
      },
      // select: {
      //   email: true,
      //   createdAt: true,
      // },
    });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
