import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    PostsModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://sayf:sayf12@cluster0.lnrhp.mongodb.net/Crud?retryWrites=true&w=majority',
    ),
  ],
  providers: [AppService],

})
export class AppModule {}
