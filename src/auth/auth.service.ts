import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { EntiteService } from 'src/entite/entite.service';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private entiteService: EntiteService,
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
      sub: user.user_id,
    };

    return this.jwtService.sign(payload);
  }

  async signup(dto: SignupDto) {
    console.log(dto);
    const entite = await this.entiteService.findByTitre(dto.entiteTitre);
    if (!entite) throw new HttpException('Entite not found', 400);

    const data = {
      username: dto.username,
      password: dto.password,
      entite: { connect: { entite_id: entite.entite_id } },
    };

    const user = await this.userService.create(data);
    const { password, ...result } = user;
    return result;
  }
}
