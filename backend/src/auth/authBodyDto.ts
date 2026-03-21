import { IsNotEmpty, IsString } from "class-validator";
import { Role } from "generated/prisma";

export class AuthBodyDto {
    @IsNotEmpty()
    id: number

    @IsString()
    @IsNotEmpty()
    name: string;

    
    @IsNotEmpty()
    password: string;

    role: Role
}