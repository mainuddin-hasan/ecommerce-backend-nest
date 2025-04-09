import { IsNotEmpty, IsString } from 'class-validator';
import { UserSignInDto } from './user-signin.dto';

export class UserSignUpDto extends UserSignInDto {
  @IsNotEmpty({ message: 'name can not be null' })
  @IsString({ message: 'name must be a string' })
  name: string;
}
