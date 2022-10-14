import { Query, Resolver } from '@nestjs/graphql';
import { PostModel } from './interfaces/post.model';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => PostModel)
export class PostsResolver {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @Query(() => [PostModel], { name: 'posts', nullable: true })
  async getPosts() {
    return [
      {
        id: '1',
        title: 'NestJS',
      },
      {
        id: '2',
        title: 'GraphQL',
      },
    ];
  }
}
