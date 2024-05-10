import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {User} from "./user.entity";
import { UserClient } from './userClient.entity';
import { appRepository } from './app.repository';
import { JwtModule } from '@nestjs/jwt';



@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'evuptime',
        entities: [User],
        synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '1d'}
  })
  
],
  controllers: [AppController],
  providers: [AppService,appRepository],
})
export class AppModule {}
