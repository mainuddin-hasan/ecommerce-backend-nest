import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty({ message: 'product should not be empty' })
  @IsNumber({}, { message: 'product id should be number' })
  productId: number;

  @IsNotEmpty({ message: 'ratings should not be empty' })
  @IsNumber()
  ratings: number;

  @IsNotEmpty({ message: 'comment should not be empty' })
  @IsString()
  comment: string;
}
