import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

import { HashModule } from 'src/hash/hash.module';
import { JwtModule, } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [TypeOrmModule.forFeature([User]), HashModule, 
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService], 
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('SECRET'), 
      signOptions: { expiresIn: '60s' }, 
    }),
  }),],
  providers: [AuthenticationService],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}
