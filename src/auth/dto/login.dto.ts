import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'S3curePassword!' })
  @IsNotEmpty()
  @IsString()
  password: string;
}