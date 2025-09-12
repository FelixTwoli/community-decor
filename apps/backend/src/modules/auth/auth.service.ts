import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

interface JwtPayload {
  username: string;
  sub: string;
  role: string;
}

@Injectable()
export class AuthService {
  private refreshTokens: Record<string, string> = {}; // In-memory store for refresh tokens

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = this.usersService.findByEmail(email);
    if (
      user &&
      user.password &&
      (await (
        compare as unknown as (
          data: string,
          encrypted: string,
        ) => Promise<boolean>
      )(password, user.password))
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: User): { access_token: string; refresh_token: string } {
    const payload: JwtPayload = {
      username: user.email,
      sub: user.id,
      role: user.role,
    };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' }); // Refresh token valid for 7 days

    this.refreshTokens[refreshToken] = user.id; // Store refresh token with user ID

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async refreshAccessToken(
    refreshToken: string,
  ): Promise<{ access_token: string }> {
    try {
      const decoded =
        await this.jwtService.verifyAsync<JwtPayload>(refreshToken);
      const userId: string = decoded.sub;

      if (this.refreshTokens[refreshToken] !== userId) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const user = this.usersService.findOne(userId);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const payload = { username: user.email, sub: user.id, role: user.role };
      const newAccessToken = await this.jwtService.signAsync(payload);

      return { access_token: newAccessToken };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
