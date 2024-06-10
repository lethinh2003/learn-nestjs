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

  findAll({
    page = 1,
    pageSize = 10,
  }: {
    page: number;
    pageSize: number;
  }): Promise<User[]> {
    return this.userRepository.find({
      select: {
        email: true,
        createdAt: true,
      },
      order: {
        createdAt: 1,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
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

  findOneByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
