import { ApiProperty } from '@nestjs/swagger';

export class TicketDto {
  @ApiProperty()
  ownerName: string;

  @ApiProperty()
  eventName: string;

  @ApiProperty()
  ticketId: string;

  @ApiProperty()
  eventLocation: string;

  @ApiProperty()
  startDate: string;

  @ApiProperty()
  endDate: string;

  @ApiProperty()
  ticketType: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  barCode: string;
}
