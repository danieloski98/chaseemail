import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EventCreatedDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  greeting: string;

  @ApiProperty()
  @IsString()
  start: string;

  @ApiProperty()
  @IsString()
  message: string;
}
