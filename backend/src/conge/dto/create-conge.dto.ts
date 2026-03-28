import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateCongeDto {
    @IsDateString()
    @IsNotEmpty()
    date_debut: string;

    @IsDateString()
    @IsNotEmpty()
    date_fin: string;

    @IsString()
    @IsNotEmpty()
    motif: string;
}
