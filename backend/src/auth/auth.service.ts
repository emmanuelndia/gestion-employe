import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt'
import { User } from 'generated/prisma';
import { compare } from 'bcrypt';
import { AuthBodyDto } from './authBodyDto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    // Fonction pour vérifier un mot de passe hashé
    private async isPasswordValid(password: string, hashedPassword: string): Promise<boolean> {
        return await compare(password, hashedPassword);
    }  


    // Fonction pour génerer le JWT
    private async authentificateUser({id} : {id : number}) {
        const payload = {id};
        return { access_token : await this.jwtService.sign(payload)}
    }

    async login(authBody: AuthBodyDto) {
        const { id, name, password } = authBody;

        const existingUser = await this.usersService.getUserById(id);

        if(!existingUser) throw new UnauthorizedException({error : "Utilisateur introuvable"})

        const isPasswordValid = await this.isPasswordValid(password, existingUser.password)
        if(!isPasswordValid) throw new UnauthorizedException({error : "Utilisateur introuvable"})

        return this.authentificateUser({id: existingUser.id})

    }

    /* async validateUser(user: User) {} */
}
