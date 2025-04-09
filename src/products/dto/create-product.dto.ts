import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'title can not be blank.' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'description can not be blank.' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'price can not be blank.' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'price should be number & max decimal precission 2' },
  )
  @IsPositive({ message: 'price should be positive' })
  price: number;

  @IsNotEmpty({ message: 'stock can not be blank.' })
  @IsNumber({}, { message: 'stock should be number' })
  @Min(0, { message: 'stock can not be negetive' })
  stock: number;

  @IsNotEmpty({ message: 'images can not be blank.' })
  @IsArray({ message: 'images should be in array format' })
  images: string[];

  @IsNotEmpty({ message: 'category id can not be blank.' })
  @IsNumber({}, { message: 'category id should be number' })
  categoryId: number;
}
