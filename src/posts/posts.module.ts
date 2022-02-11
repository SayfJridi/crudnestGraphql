import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, postSchema } from './common/post.schema';

@Module({
  providers: [PostsService, PostsResolver],
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: postSchema }]),
  ],
})
export class PostsModule {}
