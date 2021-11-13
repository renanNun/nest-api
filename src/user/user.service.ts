import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CredentialsDto } from 'src/auth/dto/credentials.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = bcrypt.genSaltSync();
    
    this.hashPassword(createUserDto.password, saltOrRounds).then(password => {
      createUserDto.password = password;
    });

    const user = this.repository.create(createUserDto);
    return this.repository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<User> {
    return this.repository.findOne(id);
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

  private async hashPassword(password: string, saltOrRounds: string): Promise<string> {
    return await bcrypt.hash(password,saltOrRounds);
  }

}
