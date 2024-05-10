import {BadRequestException, Body, Controller, Get, Inject, Post, Req, Res, UnauthorizedException} from '@nestjs/common';
import {AppService} from './app.service';
import * as bcrypt from 'bcrypt';
import {User} from "./user.entity";
import { JwtService } from '@nestjs/jwt';
import {Response, Request, response} from 'express';

@Controller('api')
export class AppController {
  
    constructor(

        private readonly appService: AppService,

    ) {
    }

@Inject(JwtService)
    private readonly jwtService:JwtService;

@Get()

async findMany () :  Promise<User[]> 

{
    return this.appService.findMany();
}

@Post('login')
async login(
    @Body('Email') Email: string,
    @Body('password') password: string,
    @Res({passthrough:true}) response : Response
) {
    
    const user = await this.appService.findOne(Email);        
    

    if (!user) {
        throw new BadRequestException('invalid credentials');
    }

    if (!await bcrypt.compare(password, user.password)) {
      throw new BadRequestException('invalid password credentials');
    }


    const jwt = await this.jwtService.signAsync({email:user.Email});    
    
    response.cookie('jwt',jwt,{httpOnly:true})
    
    return {
        message:"Success"
    } 

} 
/*Register as Supplier */
    @Post('register')
    async register(
        @Body('stationName') stationName: string,
        @Body('Phone') Phone: string,
        @Body('Enseigne') Enseigne: string,
        @Body('Region') Region: string,
        @Body('Location') Location: string,
        @Body('Address') Address: string,
        @Body('Email') Email: string,
        @Body('password') password: string
    ) {
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await this.appService.create({
          stationName,
          Phone,
          Enseigne,
          Location,
          Region,
          Address,
          Email,
          password: hashedPassword
        });

        delete user.password;
        console.log(user)
        return user;
    }

    /*Regsiter as Client*/

    @Post('registerClient')
    async registerClient(
        @Body('Name') Name: string,
        @Body('Phone') Phone: string,
        @Body('Email') Email: string,
        @Body('password') password: string
    ) {
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await this.appService.create({
          Name,
          Phone,     
          Email,
          password: hashedPassword
        });

        delete user.password;
        console.log(user)
        return user;
    }


    @Get('user')
    async user(@Req() request: Request) {
        try {
            const cookie = request.cookies['jwt'];
            
            const data = await this.jwtService.verifyAsync(cookie);

            if (!data) {
                throw new UnauthorizedException();
            }

            console.log(data)

            const email = data['email']  
            console.log(email)   

            const user = await this.appService.findOne(email); 
            const {password, ...result} = user;

            return result;
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Post('logout')
    async logout(@Res({passthrough: true}) response: Response) {
        response.clearCookie('jwt');

        return {
            message: 'success'
        }
    } 
}