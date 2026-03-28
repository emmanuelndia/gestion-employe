import { IsNotEmpty, IsString } from "class-validator";
import { Role } from "generated/prisma";

export class AuthBodyDto {
    
    
    @IsNotEmpty()
    name: string;

    
    @IsNotEmpty()
    password: string;

}