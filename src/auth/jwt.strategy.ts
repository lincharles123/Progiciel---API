import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    // Later, for cookie-based auth
    // super({
    //   jwtFromRequest: ExtractJwt.fromExtractors([
    //     (req: Request) => {
    //       // 👇 Custom extractor to read the token from cookie
    //       return req?.cookies?.token || null;
    //     },
    //   ]),
    //   ignoreExpiration: false,
    //   secretOrKey: configService.get<string>('jwt.secret') ?? 'default',
    // });

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret') ?? 'default',
    });
  }

  async validate(payload: any) {
    if (!payload) {
      throw new UnauthorizedException();
    }

    return {
      userId: payload.sub,
      username: payload.username,
      entite_id: payload.entite_id,
    };
  }
}
