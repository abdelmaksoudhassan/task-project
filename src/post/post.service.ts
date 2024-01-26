import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { Person } from 'src/auth/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post) private readonly postRepository:Repository<Post>
    ){}

    async createPost(person: Person,createPostDto: CreatePostDto): Promise<Post>{
        const { text } = createPostDto
        const post = this.postRepository.create({ text, owner: person })
        await this.postRepository.save(post)
        delete post.owner
        return post
    }

    async deletePost(id: number): Promise<string>{
        const post = await this.postRepository.findOne({where:{id}})
        if(! post){
            throw new NotFoundException(`post with id ${id} not found`)
        }
        await this.postRepository.remove(post)
        return `post with id ${id} deleted`
    }

    async editPost(id: number, person: Person, updatePostDto: UpdatePostDto): Promise<Post>{
        const post = await this.postRepository.findOne({where:{id}})
        if(! post){
            throw new NotFoundException(`post with id ${id} not found`)
        }
        if(post.owner !== person && person.role !== Role.ADMIN){
            throw new UnauthorizedException(`this post not belongs to you`)
        }
        const { text } = updatePostDto
        post.text = text
        return await this.postRepository.save(post)
    }

    async getPostById(id: number): Promise<Post>{
        const post = await this.postRepository.findOne({where:{id}})
        if(! post){
            throw new NotFoundException(`post with id ${id} not found`)
        }
        return post
    }

    async getAllPosts(): Promise<Post[]>{
        const posts = await this.postRepository.find()
        return posts
    }
}