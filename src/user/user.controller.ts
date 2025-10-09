import { Body, Controller, Post, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from '../decorator/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('create')
  async create(@Body() body) {
    return await this.userService.createUser(body);
  }
}
