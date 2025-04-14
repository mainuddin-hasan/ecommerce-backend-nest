import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class OrderedProductsDto {
  @IsNotEmpty({ message: 'product is not empty' })
  id: number;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'product price should be number & max decimal precession is 2' },
  )
  @IsPositive({ message: 'product unit price price can not be negetive' })
  product_unit_price: number;

  @IsNumber({}, { message: 'product quantity should be number' })
  @IsPositive({ message: 'product quantity can not be negetive' })
  Product_quantity: number;
}
