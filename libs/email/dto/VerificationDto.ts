import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EmailVerificationDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  greeting: string;

  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  message: string;
}
