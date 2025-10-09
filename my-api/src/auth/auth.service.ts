import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }

    throw new HttpException('Invalid credentials', 401);
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      entite_id: user.entite_id,
      sub: 5,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
