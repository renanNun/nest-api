import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { IsUserAlreadyExist } from "src/decorators/exists.decorator";
import { Match } from "src/decorators/match.decorator";
import { UserRole } from "../entities/user.entity";

export class CreateUserDto {
    @ApiProperty({ example: 'John Jones' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'johnjones@gmail.com' })
    @IsEmail()
    @IsNotEmpty()
    @IsUserAlreadyExist({
        message: 'User $value already exists. Choose another email.',
      })
    email: string;

    @ApiProperty({ example: 'passwordcool' })
    @IsString()
    @Length(6,12)
    @IsNotEmpty()
    password: string;

    @ApiProperty({ example: 'passwordcool', description: 'Password confirmation must match the password' })
    @IsString()
    @Length(6,12)
    @IsNotEmpty()
    @Match('password')
    passwordConfirm: string;

    @ApiProperty({ example: 'ghost', description: 'Must be a valid role' })
    @IsString()
    @IsNotEmpty()
    role: UserRole;
}
