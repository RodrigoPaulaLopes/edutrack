import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { Role } from '../enums/user.enum';
export class CreateUserDto {

    @IsNotEmpty()
    username: string
    
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8,
        minNumbers: 2, 
        minUppercase: 1,
        minSymbols: 1, 
        minLowercase: 1
    })
    password: string

}
