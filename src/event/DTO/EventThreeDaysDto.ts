import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

class MailListItem {
  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;
}

export class EventThreeDaysDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  eventTitle: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  time: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  creatorName: string;

  @ApiProperty({
    type: MailListItem,
    isArray: true,
  })
  mailList: [MailListItem];
}
