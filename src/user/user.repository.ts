import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import * as bcrypt from 'bcrypt';
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { CredentialsDto } from "src/auth/dto/credentials.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(createUserDto: CreateUserDto): Promise <User>{
        
        const {name, email, password, role} = createUserDto;

        const user = this.create();
        user.email = email;
        user.name = name;
        user.role = role;
        user.password = await this.hashPassword(password);

        try {
            await user.save();
            delete user.password;
            return user;
        } catch (error) {
            if(error.code.toString() === '23505')
            {
                throw new ConflictException('Endereço de email já está em uso');
            }else{
                throw new InternalServerErrorException(
                    'Erro ao salvar usuário no banco de dados'
                );
            }
        }

    }

    async checkCredentials(credentialsDto: CredentialsDto): Promise<User> {

        const {email, password} = credentialsDto;

        const user = await this.findOne({email: email});

        if(user && (await user.checkPassword(password))) {
            delete user.password;
            return user;
        }else{
            return null;
        }

    }

    private async hashPassword(password: string): Promise<string> {
        let salt = await bcrypt.genSalt();
        return bcrypt.hash(password, salt).then(hash => {
            return hash;
        });
    }
}