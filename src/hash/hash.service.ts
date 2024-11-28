import { Injectable } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcrypt'
@Injectable()
export class HashService {

    /**
     * createHash
     */
    public async createHash(password: string) : Promise<string> {
        return await hash(password, 10)
    }
    public async compareHash(encrypted: string, password: string) : Promise<boolean> {
        return await compare(password, encrypted)
    }

}
