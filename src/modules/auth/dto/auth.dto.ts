import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ description: 'User email', example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Username', example: 'johndoe' })
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty({ description: 'Password', example: 'StrongPassword123!' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'Full name', example: 'John Doe' })
  @IsString()
  fullName: string;
}

export class LoginDto {
  @ApiProperty({ description: 'User email', example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password', example: 'StrongPassword123!' })
  @IsString()
  password: string;
}
