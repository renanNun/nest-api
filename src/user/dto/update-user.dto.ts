import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({ example: 'John Jones' })
    @IsOptional()
    name: string;
    
    @ApiProperty({ example: 'johnjones@gmail.com' })
    @IsOptional()
    email: string;

}
