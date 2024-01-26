import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { GetPerson } from 'src/auth/decorators/get-person.decorator';
import { Person } from 'src/auth/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as Post_ } from './entities/post.entity';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard())
  async createPost(
    @GetPerson() person: Person,
    @Body() createPostDto: CreatePostDto
  ): Promise<Post_>{
    return this.postService.createPost(person,createPostDto)
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(),RoleGuard)
  deletePost(@Param('id') id: number): Promise<string>{
    return this.postService.deletePost(id)
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  async editPost(
    @Param('id') id: number,
    @GetPerson() person: Person,
    @Body() updatePostDto: UpdatePostDto
  ): Promise<Post_>{
    return this.postService.editPost(id,person,updatePostDto)
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  getPost(@Param('id') id: number): Promise<Post_>{
    return this.postService.getPostById(id)
  }

  @Get()
  @UseGuards(AuthGuard())
  getPosts(): Promise<Post_[]>{
    return this.postService.getAllPosts()
  }
}