import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class TicketSaleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  eventName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  eventDescription: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  ticketName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  ticketPrice: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  eventDate: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  evenTime: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  barcode: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
}
