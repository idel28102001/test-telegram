import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';

export class ConfirmPhoneDto {
  @ApiProperty()
  @IsMobilePhone()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phoneCodeHash: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  telegramCode: string;
}
