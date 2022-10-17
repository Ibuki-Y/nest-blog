import { PrismaService } from './../prisma/prisma.service';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { PostModel } from './interfaces/post.model';
import { GetPostsArgs } from './interfaces/get-posts-connection.args';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => PostModel)
export class PostsResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [PostModel], { name: 'fixedPosts', nullable: true })
  async getPostsByFixedData() {
    return [
      {
        id: '1',
        title: 'NestJS is so good.',
      },
      {
        id: '2',
        title: 'GraphQL is so good.',
      },
    ];
  }

  @Query(() => [PostModel], { name: 'prismaPosts', nullable: true })
  async getPostsByPrisma() {
    return this.prisma.post.findMany();
  }

  @Query(() => [PostModel], { name: 'posts', nullable: true })
  async getPosts(@Args() args: GetPostsArgs) {
    return this.prisma.post.findMany({
      where: {
        type: args.type
          ? {
              in: args.type,
            }
          : undefined,
      },
      orderBy: {
        publishDate: 'desc',
      },
    });
  }
}
