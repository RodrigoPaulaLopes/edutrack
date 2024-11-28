import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CredentialsDto } from './dto/credentials.dto';
import { User } from 'src/users/entities/user.entity';
import { HashService } from 'src/hash/hash.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
@Injectable()
export class AuthenticationService {


    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private readonly hash: HashService, private readonly token: JwtService ){

    }

    async login({username, password}: CredentialsDto) {
        const user: User = await this.userRepository.findOne({where: {username: username}})

        if(!user) throw new HttpException("Credenciais invalidas", 400)

        const hashPass = await this.hash.compareHash(user.password, password)

        if(!hashPass) throw new HttpException("Credenciais invalidas", 400)

        const payload = {sub: user.id, username: user.username}
        const access_token: AccessTokenDto = {access_token: await this.token.signAsync(payload)}
        
        return access_token
        
    }
}
