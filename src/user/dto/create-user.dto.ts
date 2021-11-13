import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length, MinLength } from "class-validator";
import { IsUserAlreadyExist } from "src/decorators/userExists.decorator";
import { Match } from "src/decorators/match.decorator";
import { UserRole } from "src/user/user-role.enum";
import { IsRoleExist } from "src/decorators/checkRole.decorator";

export class CreateUserDto {
    @ApiProperty({ example: 'John Jones', description: 'O Nome deve ser um nome válido, com no mínimo 3 caracteres' })
    @IsString({
      message: 'O Nome deve ser um tipo de dado válido!'
    })
    @IsNotEmpty({
      message: 'O Nome não pode ser vazio!'
    })
    @MinLength(3,{
      message: 'O Nome deve conter ao menos 3 caracteres!'
    })
    name: string;

    @ApiProperty({ example: 'johnjones@gmail.com' })
    @IsEmail({}, {
      message: 'O email deve ser um email válido!'
    })
    @IsNotEmpty({
      message: 'O Campo email não pode ser vazio!'
    })
    @IsUserAlreadyExist({
        message: 'Um Usuário com o email $value já está cadastrado.',
    })
    email: string;

    @ApiProperty({ example: 'passwordcool' })
    @IsString({
      message: 'A senha deve ser um tipo de dado válido.'
    })
    @Length(6,12, {
      message: 'A senha deve conter entre 6 e 12 caracteres.'
    })
    @IsNotEmpty({
      message: 'A senha não pode ser vazia.'
    })
    password: string;

    @ApiProperty({ example: 'passwordcool', description: 'As senhas devem ser iguais' })
    @IsString({
      message: 'A senha deve ser um tipo de dado válido.'
    })
    @Length(6,12, {
      message: 'A senha deve conter entre 6 e 12 caracteres.'
    })
    @IsNotEmpty({
      message: 'A senha não pode ser vazia.'
    })
    @Match('password', {
      message: 'As senhas devem ser iguais'
    })
    passwordConfirm: string;

    @ApiProperty({ example: 'ghost', description: 'Must be a valid role' })
    @IsString({
      message: 'O Cargo precisa ser um tipo de dado válido.'
    })
    @IsNotEmpty({
      message: 'O Cargo não pode ficar vazio.'
    })
    @IsRoleExist({
      message: 'O Cargo deve ser um cargo válido do sistema.'
    })
    role: UserRole;
}
