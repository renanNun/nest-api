import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/decorators/role.decorator';
import { UserRole } from './user-role.enum';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  create(@Body() createUserDto: CreateUserDto) {
    const user =  this.userService.create(createUserDto);
    return {
      user,
      message: 'Usuário cadastrado com sucesso!'
    }
  }

  @Get()
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
