import { ApiProperty } from '@nestjs/swagger';

export class ImageDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  image: any;
}
