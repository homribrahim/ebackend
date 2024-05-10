import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { Inject } from "@nestjs/common";

export class appRepository extends Repository<User>
{
    
    
    constructor(@Inject(DataSource) private readonly dataSource:DataSource)
    {
        super(User,dataSource.createEntityManager())  
    }

    async findUserMany () :  Promise<User[]> 
    {
        return this.find();
    }

    async findOneUser (Email:string) : Promise<User> 
    {
        return this.findOne({where:{Email}})
    }

}