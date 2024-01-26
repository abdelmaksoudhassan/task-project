import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import * as bcrypt from 'bcrypt';
import  * as jwt from 'jsonwebtoken'
import { LoginPersonDto } from './dto/login-person.dto';
import { Payload } from './interfaces/payload.inteface';
import { AuthToken } from './classes/token.class';
import { Role } from './enums/role.enum';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Person) private readonly personRepository:Repository<Person>
    ){}

    async signup(createPersonDto: CreatePersonDto): Promise<string>{
        const { email, password } = createPersonDto
        const user = await this.personRepository.findOneBy({email: email.toLowerCase()})
        if(user){
            throw new ForbiddenException(`email ${email} registered before`)
        }
        const hashedPassword = await this.hashPassword(password,10)
        const newUser = await this.personRepository.create({ email: email.toLowerCase(),password: hashedPassword })
        await this.personRepository.save(newUser)
        return 'Registeration done'
    }

    async login(loginPersonDto: LoginPersonDto): Promise<AuthToken>{
        const { email, password } = loginPersonDto
        const person = await this.personRepository.findOne({where: { email: email.toLowerCase() }})
        if(! person){
            throw new NotFoundException(`user with email ${email} not found`)
        }
        const equaled = await person.comparePassword(password)
        if(! equaled){
            throw new UnauthorizedException('wrong password')
        }
        const payload: Payload = { id: person.id, email: person.email }
        const token = this.generateToken(payload,"this is secret key")
        return { token }
    }

    async upgradeToAdmin(id: number): Promise<Person>{
        const person = await this.personRepository.findOne({where:{id}})
        if(! person){
            throw new NotFoundException(`post with id ${id} not found`)
        }
        if(person.role == Role.ADMIN){
            throw new BadRequestException(`user with id ${id} already admin`)
        }
        person.role = Role.ADMIN
        return this.personRepository.save(person)
    }

    async validatePerson(payload: Payload): Promise<Person>{
        const {id, email} = payload
        const person = await this.personRepository.findOne({where: {id, email}})
        if(! person){
            throw new NotFoundException(`user with id ${id} not found`)
        }
        return person
    }

    private async hashPassword(_password, _salt): Promise<string>{
        const salt = await bcrypt.genSalt(_salt)
        const password = await bcrypt.hash(_password,salt)
        return password
    }

    private generateToken(payload: Payload, secret: string): string{
        return jwt.sign(payload, secret)
    }
}