import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { JWT_SECTET } from './auth/auth.constant';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AdminControlelr } from './controllers/admin.controller';
import { UserController } from './controllers/user.controller';
import { AdminService } from './services/admin.service';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Answer } from './entities/answer.entity';
import { Notice } from './entities/notice.entity';
import { Question } from './entities/question.entity';
import { JwtStrategy } from './auth/auth.strategy';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE || 'simpleFreshCup',
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'root',
      synchronize: true,
      port: parseInt(process.env.DB_PORT || '5432'),
      entities: [Answer, Notice, Question, User],
    }),
    TypeOrmModule.forFeature([Answer, Notice, Question, User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: JWT_SECTET,
      signOptions: { expiresIn: process.env.JWT_EXPIRE || '4h' },
    }),
  ],
  controllers: [AppController, AuthController, AdminControlelr, UserController],
  providers: [AppService, AuthService, AdminService, UserService, JwtStrategy],
})
export class AppModule {}
