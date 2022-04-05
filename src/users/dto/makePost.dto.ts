import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class makePost {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  post: string;
}
