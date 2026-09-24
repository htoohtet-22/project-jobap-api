import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword, Length } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'johndoe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'S3curePassword!' })
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: 'John Doe' })
  @Length(3, 30)
  username: string;
}