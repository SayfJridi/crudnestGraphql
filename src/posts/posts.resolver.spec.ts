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
      res.time = new Date('2022-02-14T13:41:10.061Z');
      return await res;
    }),
    get: jest.fn(async () => await []),
    getOne: jest.fn(
      async (_id: Types.ObjectId) =>
        (await {
          _id,
          title: 'random found title',
          content: 'random found content',
          time: new Date('2022-02-14T13:41:10.061Z'),
        }) as Post,
    ),
    update: jest.fn(
      async (_id, updateDto: createPostInput) => await { _id, ...updateDto },
    ),
    delete: jest.fn(async (_id: Types.ObjectId) => {
      return (await {
        _id,
        content: 'random Deleted  content',
        title: 'random Deleted title',
        time: new Date('2022-02-14T13:41:10.061Z'),
      }) as Post;
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
        time: new Date('2022-02-14T13:41:10.061Z'),
      }),
    ).toEqual({
      _id: expect.any(Types.ObjectId),
      time: new Date('2022-02-14T13:41:10.061Z'),
      title: expect.any(String),
      content: expect.any(String),
    });
  });
  it('returns all posts', () => {
    expect(resolver.posts()).resolves.toEqual([]);
  });

  it('returns a single Post', () => {
    const _id = new Types.ObjectId('507f1f77bcf86cd799439011');

    expect(resolver.post(_id)).resolves.toEqual({
      _id: expect.any(Types.ObjectId),
      content: expect.any(String),
      title: expect.any(String),
      time: expect.any(Date),
    });
  });
  it('Should Return The Post Updated', () => {
    const mockinput = new createPostInput();
    const _id = new Types.ObjectId('507f1f77bcf86cd799439011');
    mockinput.content = 'random Updated content';
    mockinput.title = 'random Updated title';
    mockinput.time = new Date('2022-02-14T13:41:10.061Z');
    expect(
      resolver.updatePost(_id, {
        ...mockinput,
      }),
    ).resolves.toEqual({
      _id,
      title: mockinput.title,
      content: mockinput.content,
      time: new Date('2022-02-14T13:41:10.061Z'),
    });
  });
  it('Should Return The Post Delete', () => {
    const mock_id = new Types.ObjectId();
    const mockdeletedPost = new Post();
    mockdeletedPost._id = mock_id;
    mockdeletedPost.time = new Date('2022-02-14T13:41:10.061Z');
    mockdeletedPost.content = 'random Deleted  content';
    mockdeletedPost.title = 'random Deleted title';

    expect(resolver.deletePost(mock_id)).resolves.toEqual(mockdeletedPost);
  });
});
