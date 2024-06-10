import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { UserModule } from './user/user.module';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'learn_nestjs',
      username: 'lethinh2003',
      password: 'thinh123',
      // entities: [__dirname + '/../**/*.entity.{js,ts}'],
      entities: [User, Post, Comment],
      synchronize: true,
      autoLoadEntities: true,
      logging: 'all',
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('auth');
  }
  constructor(private dataSource: DataSource) {}
}
