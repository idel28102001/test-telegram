import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TelegramService } from 'src/telegram/services/telegram/telegram.service';
import { User } from 'src/typeorm';
import { makePost } from 'src/users/dto/makePost.dto';
import { UserRegisterDto } from 'src/users/dto/userRegister.dto';
import { AuthUser } from 'src/users/interfaces/auth-user.interface';
import { CreateUser } from 'src/users/interfaces/createUser.interface';
import { Repository } from 'typeorm';

@Injectable()
export class UserServices {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly telegramServices: TelegramService,
  ) {}

  async checkExistsPhone(phone: string): Promise<boolean | ConflictException> {
    const user = await this.getByPhone(phone);
    if (user) {
      throw new ConflictException('This phone number already in use');
    }
    return false;
  }

  async getForAuthPhone(phone: string): Promise<AuthUser | null> {
    return await this.userRepository.findOne({
      select: ['id', 'password', 'phone', 'phoneCodeHash'],
      where: { phone },
    });
  }

  async getByPhone(phone: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { phone: phone, isActive: true },
    });
  }

  async getById(id: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async sendPostToTelegram(dto: makePost) {
    this.telegramServices.sendMessage(dto.post);
  }
}
