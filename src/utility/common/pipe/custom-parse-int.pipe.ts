import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
  } from '@nestjs/common';
  
  @Injectable()
  export class CustomParseIntPipe implements PipeTransform<string, number> {
    transform(value: string, metadata: ArgumentMetadata): number {
      const val = parseInt(value, 10);
      if (isNaN(val)) {
        throw new BadRequestException(`'${value}' is not a valid numeric id.`);
      }
      return val;
    }
  }
  