import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';
import { Repository } from 'typeorm';
import { CredentialsDto } from './dto/credentials.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private repository: UserRepository,
        private jwtService: JwtService
    ) {}

    async signIn(credentialsDto: CredentialsDto) {
        const user = await this.repository.checkCredentials(credentialsDto);

        if(!user){
            throw new UnauthorizedException('Credenciais Inválidas!');
        }

        const jwtPayLoad = {
            id: user.id,
        };

        const token = await this.jwtService.sign(jwtPayLoad);

        return { token };
    }
}
