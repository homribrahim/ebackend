/// <reference types="cookie-parser" />
import { AppService } from './app.service';
import { User } from "./user.entity";
import { Response, Request } from 'express';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    private readonly jwtService;
    findMany(): Promise<User[]>;
    login(Email: string, password: string, response: Response): Promise<{
        message: string;
    }>;
    register(stationName: string, Phone: string, Enseigne: string, Region: string, Location: string, Address: string, Email: string, password: string): Promise<User>;
    registerClient(Name: string, Phone: string, Email: string, password: string): Promise<User>;
    user(request: Request): Promise<{
        id: number;
        stationName: string;
        Phone: string;
        Enseigne: string;
        Region: string;
        Location: string;
        Address: string;
        Email: string;
    }>;
    logout(response: Response): Promise<{
        message: string;
    }>;
}
