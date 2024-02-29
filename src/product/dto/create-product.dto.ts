import { IsNotEmpty } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty( { message: 'name is required' })
    name:string;
    @IsNotEmpty({message:  'price is required'})
    price: number;
    @IsNotEmpty({message : 'quantity is required'})
    quantity:number;
}
