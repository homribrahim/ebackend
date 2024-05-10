import {Inject, Injectable} from '@nestjs/common';
import {User} from "./user.entity";
import { appRepository } from './app.repository';

@Injectable()
export class AppService {
    constructor(
       
    ) {
    }

    @Inject(appRepository)
        private readonly appRepository:appRepository;

    async findMany () :  Promise<User[]> 
    {
        return this.appRepository.findUserMany();
    }



    async create(data: any): Promise<User> {
        return this.appRepository.save(data);
    }
   
    async findOne(Email: any):Promise<User>{
      return this.appRepository.findOneUser(Email);
      }

    
  
      
   /*  async findOne(condition: any): Promise<User> {
        return this.userRepository.findOne(condition);
    } */
}