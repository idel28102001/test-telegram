import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty } from 'class-validator';

export class telegramPhoneDto {
  @ApiProperty()
  @IsMobilePhone()
  @IsNotEmpty()
  phone: string;
}
