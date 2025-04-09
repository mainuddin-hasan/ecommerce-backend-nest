import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'title can not be null' })
  @IsString({ message: 'title must be a string' })
  title: string;

  @IsNotEmpty({ message: 'Description can not be null' })
  @IsString({ message: 'Description must be a string' })
  description: string;
}
