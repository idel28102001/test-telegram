import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ name: 'hash' })
  @IsNotEmpty()
  @IsString()
  phoneCodeHash: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  telegramCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8, {
    message: 'Password must be at least 8 characters',
  })
  password: string;

  isActive?: boolean;
  telegramSession?: string | void;
}
