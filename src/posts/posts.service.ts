import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { createPostInput } from './common/post.input';
import { Post } from './common/post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private PostsModel: Model<Post>) {}
  async create(createPostInput: createPostInput): Promise<Post> {
    return await this.PostsModel.create(createPostInput);
  }
  async getOne(_id: Types.ObjectId): Promise<Post> {
    return await this.PostsModel.findOne({ _id });
  }

  async delete(_id: Types.ObjectId): Promise<Post> {
    return await this.PostsModel.findOneAndDelete({ _id });
  }
  async get(): Promise<Post[]> {
    return await this.PostsModel.find();
  }
  async update(updatePostInput: createPostInput): Promise<Post> {
    return await this.PostsModel.findOneAndUpdate({ ...updatePostInput });
  }
}
