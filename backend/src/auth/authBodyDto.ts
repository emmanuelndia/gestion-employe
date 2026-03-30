import { IsNotEmpty, IsString } from "class-validator";
import { Role } from "@prisma/client";

export class AuthBodyDto {
    
    
    @IsNotEmpty()
    name: string;

    
    @IsNotEmpty()
    password: string;

}