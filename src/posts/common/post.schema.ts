import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
@ObjectType()
export class Post {
  @Field((_) => String)
  _id: Types.ObjectId;
  @Field()
  @Prop()
  title: string;
  @Field()
  @Prop()
  content: string;
}

export const postSchema = SchemaFactory.createForClass(Post);
