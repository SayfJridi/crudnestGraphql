import { Type } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { resolve } from 'path/posix';
import { createPostInput } from './common/post.input';
import { Post, postSchema } from './common/post.schema';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

describe('PostsResolver', () => {
  let resolver: PostsResolver;

  let service = {
    create: jest.fn(async (createdto) => {
      const res = new Post();
      res._id = new Types.ObjectId('507f1f77bcf86cd799439011');
      res.content = createdto.content;
      res.title = createdto.title;
      return await res;
    }),
    get: jest.fn(async () => await []),
    getOne: jest.fn(
      async (_id: Types.ObjectId) =>
        await { _id, title: 'qjwqj', content: 'cqwhwhqwehe' },
    ),
    update: jest.fn(
      async (_id, updateDto: createPostInput) => await { _id, ...updateDto },
    ),
    delete: jest.fn(async (_id: Types.ObjectId) => {
      return await {
        _id,
        content: 'random Deleted  content',
        title: 'random Deleted title',
      }as Post;
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsResolver, PostsService],
    })
      .overrideProvider(PostsService)
      .useValue(service)
      .compile();
    resolver = module.get<PostsResolver>(PostsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  it('Should Return The Post Created', async () => {
    const mockres = new Post();
    mockres._id = new Types.ObjectId('507f1f77bcf86cd799439011');
    mockres.content = 'random content';
    mockres.title = 'random title';

    expect(
      await resolver.createPost({
        title: 'random title',
        content: 'random content',
      }),
    ).toEqual(mockres);
  });
  it('returns all posts', async () => {
    expect(await resolver.posts()).toEqual([]);
  });

  it('returns all posts', async () => {
    expect(await resolver.posts()).toEqual([]);
  });
  it('Should Return The Post Updated', async () => {
    const mockinput = new createPostInput();
    const _id = new Types.ObjectId('507f1f77bcf86cd799439011');
    mockinput.content = 'random Updated content';
    mockinput.title = 'random Updated title';
    expect(
      await resolver.updatePost(_id, {
        ...mockinput,
      }),
    ).toEqual({ _id, title: mockinput.title, content: mockinput.content });
  });
  it('Should Return The Post Delete', async () => {
    const mock_id = new Types.ObjectId();
    const mockdeletedPost = new Post();
    mockdeletedPost._id = mock_id;
    mockdeletedPost.content = 'random Deleted  content';
    mockdeletedPost.title = 'random Deleted title';

    expect(await resolver.deletePost(mock_id)).toEqual(mockdeletedPost);
  });
});
