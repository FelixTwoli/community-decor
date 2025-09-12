import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { hash } from 'bcrypt';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @ApiBody({ type: CreateUserDto })
  @Post('register')
  async register(@Body() userDto: CreateUserDto): Promise<User> {
    const hashed: string = await (
      hash as unknown as (
        password: string,
        saltOrRounds: number,
      ) => Promise<string>
    )(userDto.password, 10);
    return this.usersService.create({
      ...userDto,
      password: hashed,
    });
  }

  @ApiBody({
    schema: {
      properties: { email: { type: 'string' }, password: { type: 'string' } },
    },
  })
  @Post('login')
  async login(
    @Body() body: Record<string, string>,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @ApiBody({
    schema: {
      properties: { refreshToken: { type: 'string' } },
    },
  })
  @Post('refresh')
  async refresh(
    @Body() body: { refreshToken: string },
  ): Promise<{ access_token: string }> {
    return this.authService.refreshAccessToken(body.refreshToken);
  }
}
