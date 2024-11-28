import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { HashModule } from './hash/hash.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true, 
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get<string>('DATABASE_HOST'),
      port: configService.get<number>('DATABASE_PORT'),
      username: configService.get<string>('DATABASE_USER'),
      password: configService.get<string>('DATABASE_PASSWORD'),
      database: configService.get<string>('DATABASE_NAME'),
      autoLoadEntities: true,
      synchronize: true, 
    }),
  })
  , UsersModule, AuthenticationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
