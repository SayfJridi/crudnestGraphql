import { getModelToken, MongooseModule, Schema } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { create } from 'domain';
import { Model, Types } from 'mongoose';
import { createPostInput } from './common/post.input';
import { Post, postSchema } from './common/post.schema';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;
  let mockPostModel: Model<Post>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        PostsResolver,
        {
          provide: getModelToken(Post.name),
          useValue: Model,
        },
      ],
    })
      .overrideProvider(getModelToken(Post.name))
      .useValue({
        findOne: jest.fn(async (_id: Types.ObjectId) => await new Post()),
        find: jest.fn(async (_id: Types.ObjectId) => (await []) as Post[]),
        create: jest.fn(async (createdto: createPostInput) => {
          return await new Post() as Post;
        }),
        findOneAndDelete: jest.fn(
          async (_id: Types.ObjectId) => await new Post(),
        ),
        findOneAndUpdate: jest.fn(
          async (_id: Types.ObjectId, updateInput: createPostInput) =>
            await new Post(),
        ),
      })
      .compile();
    mockPostModel = module.get<Model<Post>>(getModelToken(Post.name));
    service = module.get<PostsService>(PostsService);
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should Fetch a Post from database With Post.FindById ', async () => {
    const postId = new Types.ObjectId('507f1f77bcf86cd799439011');
    const spy = jest
      .spyOn(mockPostModel, 'findOne')
      .mockResolvedValue(new Post() as Post);
    await service.getOne(postId);
    expect(spy).toBeCalled();
  });
  it('should Fetch a Post from database With Post.Find', async () => {
    const spy = jest
      .spyOn(mockPostModel, 'find')
      .mockResolvedValue([] as Post[]);
    await service.get();
    expect(spy).toBeCalled();
  });
  it('should delete a Post from database With Post.Delete', async () => {
    const postId = new Types.ObjectId('507f1f77bcf86cd799439011');
    const spy = jest
      .spyOn(mockPostModel, 'findOneAndDelete')
      .mockResolvedValue(new Post() as Post);
    await service.delete(postId);
    expect(spy).toBeCalled();
  });
  it('should update a Post from database With Post.update', async () => {
    const postId = new Types.ObjectId('507f1f77bcf86cd799439011');
    const spy = jest
      .spyOn(mockPostModel, 'findOneAndUpdate')
      .mockResolvedValue(new Post() as Post);
    await service.update(postId, new createPostInput());
    expect(spy).toBeCalled();
  });
  /*
  it('should CREATE a Post from database With Post.create', async () => {
    const postId = new Types.ObjectId('507f1f77bcf86cd799439011');
    const spy = jest
    .spyOn(mockPostModel, 'create')
    .mockResolvedValue(new Post() as Post);
    await service.create(new createPostInput());
    expect(spy).toBeCalled();
  });
  */
});
