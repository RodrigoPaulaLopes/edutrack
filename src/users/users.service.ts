import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HashService } from 'src/hash/hash.service';

@Injectable()
export class UsersService {


  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private readonly hash: HashService){

  }
  async create({username, password}: CreateUserDto) : Promise<User> {

    const user = await this.userRepository.findOne({where: {username: username}})
    if(user) throw new HttpException("Usuario já existe!", 400)

    const new_password: string = await this.hash.createHash(password)  
    return await this.userRepository.save({username, password: new_password})

  }

  async findAll() : Promise<User[]>{
    return await this.userRepository.find()
  }

  async findOne(id: string) : Promise<User>{
    try {
      const user: User = await this.userRepository.findOneByOrFail({id: id})
      return user
    } catch (error) {
      throw new HttpException(`Usuario não encontrado com o id ${id}`, 404)
    }
   
  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    const user: User = await this.findOne(id) 

    const new_user = {...user, ...updateUserDto}
    await this.userRepository.update(user.id, new_user)
    return await this.findOne(id) 
  }

  async remove(id: string) {

    const user: User = await this.findOne(id)
    return this.userRepository.remove(user)
  }
}
