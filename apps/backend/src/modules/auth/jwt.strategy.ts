import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtPayload {
  username: string;
  sub: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'super-secret-key', // TODO: move to ENV
    });
  }

  validate(payload: JwtPayload): {
    userId: string;
    email: string;
    role: string;
  } {
    return { userId: payload.sub, email: payload.username, role: payload.role };
  }
}
