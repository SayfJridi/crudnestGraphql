import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';

@InputType()
export class createPostInput {
  @Field()
  title: string;
  @Field()
  content: string;

  @Field((_) => GraphQLISODateTime)
  time: Date;
}
