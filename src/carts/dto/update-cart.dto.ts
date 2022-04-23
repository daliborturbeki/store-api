import { IsOptional } from 'class-validator';
import { CartProduct } from 'src/schemas/cart-product.schema';

export class UpdateCartReactDto {
    @IsOptional()
    items: CartProduct[];

    @IsOptional()
    totalQuantity: number;

    @IsOptional()
    user: string;
}

export class UpdateCartDBDto {
    @IsOptional()
    items: string[];

    @IsOptional()
    totalQuantity: number;

    @IsOptional()
    user: string;
}

