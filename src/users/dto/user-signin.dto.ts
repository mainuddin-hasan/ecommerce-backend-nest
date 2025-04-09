import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserSignInDto {
  @IsNotEmpty({ message: 'email can not be null' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'password can not be null' })
  @MinLength(5, { message: 'password must be at least 5 characters' })
  @IsString()
  password: string;
}
