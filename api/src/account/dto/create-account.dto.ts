import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateAccountDTO {
  @IsString()
  @IsNotEmpty()
  ownerFullName: string;

  @IsNumber()
  @IsNotEmpty()
  number: number;
}
