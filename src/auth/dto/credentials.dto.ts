import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";


export class CredentialsDto {
    @ApiProperty({ example: 'johnjones@gmail.com' })
    @IsString({
        message: 'O Email deve ser um tipo de dado válido.'
    })
    @IsEmail({},{
        message: 'O $value não é um endereço de email válido.'
    })
    @IsNotEmpty({
        message: 'O campo Email não pode ser vazio.'
    })
    email: string;

    @ApiProperty({ description: 'Sua Senha que possue de 6 à 12 digitos' })
    @IsString({
        message: 'O $value não é um tipo de dado válido.'
    })
    @IsNotEmpty({
        message: 'O Campo senha não pode se vazio.'
    })
    @Length(6,12,{
        message: 'O campo de senha deve ter entre 6 e 12 caracteres.'
    })
    password:string;
}
