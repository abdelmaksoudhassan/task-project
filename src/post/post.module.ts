import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([ Post ]),
    JwtModule.register({secret: "this is secret key"}),
    PassportModule.register({ defaultStrategy: 'jwt' })
   ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
