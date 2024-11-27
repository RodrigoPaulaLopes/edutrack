import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
export class CreateUserDto {

    @IsEmail()
    email: string
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
