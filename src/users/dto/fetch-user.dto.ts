import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FetchUserDto {
  @ApiProperty()
  @Expose()
  _id: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  first_name: string;

  @ApiProperty()
  @Expose()
  last_name: string;

  @ApiProperty()
  @Expose()
  token: string;
}
