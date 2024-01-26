import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { LoginPersonDto } from './dto/login-person.dto';
import { AuthToken } from './classes/token.class';
import { Person } from './entities/user.entity';
import { Roles } from './decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Role } from './enums/role.enum';
import { RoleGuard } from './guards/role.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createPersonDto:CreatePersonDto): Promise<string>{
      return this.authService.signup(createPersonDto)
  }

  @Post('signin')
  async signin(@Body() loginPersonDto: LoginPersonDto): Promise<AuthToken>{
    return this.authService.login(loginPersonDto)
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(),RoleGuard)
  async upgradeUserToAdmin(@Param('id') id: number):Promise<Person>{
    return this.authService.upgradeToAdmin(id)
  }
}