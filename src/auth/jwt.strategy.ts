import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "src/user/user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private repository: UserRepository
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'super-secret',
        });
    }

    async validate(payload: {id: string}){
        const { id } = payload;
        const user = await this.repository.findOne(id, {
            select: ['name', 'email', 'role']
        });

        if(!user) {
            throw new UnauthorizedException('Usuário não encontrado.');
        }

        return user;
    }
}