import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CredentialsDto } from 'src/auth/dto/credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly repository: UserRepository
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.repository.createUser(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<User> {
    return this.repository.findOne(id, {
      select: ['name','email','role','id']
    }).then(user => {
      if(!user) throw new NotFoundException('Usuário não encontrado');

      return user;
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.repository.preload({
      id: id,
      ...updateUserDto
    });

    if(!user) {
      throw new NotFoundException(`User ${id} not Found!`);
    }

    return this.repository.save(user);
  }

  async remove(id: string) {
    const user = await this.repository.findOne(id);
    return this.repository.remove(user);
  }

  async checkCredentials(credentialsDto: CredentialsDto): Promise<User> {

    const { email, password } = credentialsDto;

    const user = await this.repository.findOne({email: email});

    if(user && (await user.checkPassword(password)))
    {
      return user;
    }else{
      return null;
    }
  }

}
