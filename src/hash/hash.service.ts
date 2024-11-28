import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt'
@Injectable()
export class HashService {

    /**
     * createHash
     */
    public async createHash(password: string) : Promise<string> {
        return await hash(password, 10)
    }

}
