import { User } from "./user.entity";
export declare class AppService {
    constructor();
    private readonly appRepository;
    findMany(): Promise<User[]>;
    create(data: any): Promise<User>;
    findOne(Email: any): Promise<User>;
}
