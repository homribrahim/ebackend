import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
export declare class appRepository extends Repository<User> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    findUserMany(): Promise<User[]>;
    findOneUser(Email: string): Promise<User>;
}
