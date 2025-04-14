import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateShippingDto {
  @IsNotEmpty({ message: 'Phone number should not be empty' })
  @IsString({ message: 'Phone number should be string' })
  phone: string;

  @IsOptional()
  @IsString({ message: 'Name should be string' })
  name: string;

  @IsNotEmpty({ message: 'address should not be empty' })
  @IsString({ message: 'address should be string' })
  address: string;

  @IsNotEmpty({ message: 'city should not be empty' })
  @IsString({ message: 'city should be string' })
  city: string;

  @IsNotEmpty({ message: 'postcode should not be empty' })
  @IsString({ message: 'postcode should be string' })
  postcode: string;

  @IsNotEmpty({ message: 'state should not be empty' })
  @IsString({ message: 'state should be string' })
  state: string;

  @IsNotEmpty({ message: 'country should not be empty' })
  @IsString({ message: 'country should be string' })
  country: string;
}
