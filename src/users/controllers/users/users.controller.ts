import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { makePost } from 'src/users/dto/makePost.dto';
import { UserServices } from 'src/users/services/users/users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly userServices: UserServices) {}

  @Post('post')
  @UsePipes(ValidationPipe)
  async sendPost(@Body() dto: makePost) {
    await this.userServices.sendPostToTelegram(dto);
  }
}
