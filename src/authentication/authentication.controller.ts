import { Body, Controller, Post } from '@nestjs/common';
import { CredentialsDto } from './dto/credentials.dto';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {


    constructor(private readonly authService: AuthenticationService){

    }

    @Post()
    /**
     * login
     */
    public async login(@Body() credentials: CredentialsDto) {
        return await this.authService.login(credentials)
    }
}
