import { IsOptional } from 'class-validator';
import { Product } from 'src/schemas/product.schema';

export class CreateCartDto {

    items: string[];

    totalQuantity: number;

    user: string;
}
