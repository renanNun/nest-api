import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('/signin')
    async signIn(@Body(ValidationPipe) credentialsDto: CredentialsDto): Promise<{ token: string }>{
        return await this.authService.signIn(credentialsDto);
    }

    @Get('/me')
    @UseGuards(AuthGuard())
    getMe(@Req() req): User {
        return req.user;
    }
}
