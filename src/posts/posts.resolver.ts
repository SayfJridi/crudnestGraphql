import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { createPostInput } from './common/post.input';
import { Post } from './common/post.schema';
import { PostsService } from './posts.service';

@Resolver()
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}
  @Query((_) => [Post])
  async posts() {
    return await this.postsService.get();
  }
  @Query((_) => Post)
  async post(@Args('_id', { type: () => String }) _id: Types.ObjectId) {
    return await this.postsService.getOne(_id);
  }

  @Mutation((_) => Post)
  async createPost(@Args('createPostInput') createPostInput: createPostInput) {
    return await this.postsService.create(createPostInput);
  }

  @Mutation((_) => Post)
  async updatePost(@Args('_id', { type: () => String }) _id: Types.ObjectId, @Args('updatePostInput') updatePostInput: createPostInput) {
    return await this.postsService.update(_id, updatePostInput);
  }

  @Mutation((_) => Post)
  async deletePost(@Args('_id', { type: () => String }) _id: Types.ObjectId) {
    return await this.postsService.delete(_id);
  }
}
