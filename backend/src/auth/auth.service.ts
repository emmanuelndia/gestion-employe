import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client';
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
    private async authentificateUser({ id, role, employeeId }: { id: number; role: string; employeeId?: number | null }) {
        const payload = { id, role, employeeId };
        return { access_token: this.jwtService.sign(payload) }
    }

    async login(authBody: AuthBodyDto) {
        const { name, password } = authBody;
        console.log(name, password);

        const existingUser = await this.usersService.findByName(name);
        console.log(existingUser);

        if(!existingUser) throw new UnauthorizedException({error : "Utilisateur introuvable"})

        const isPasswordValid = await this.isPasswordValid(password, existingUser.password)
        if(!isPasswordValid) throw new UnauthorizedException({error : "Mot de passe incorrect"})

        const token = await this.authentificateUser({ 
            id: existingUser.id, 
            role: existingUser.role, 
            employeeId: (existingUser as any).employeeId // cast to any temporarily until prisma client regenerated
        })

        return { 
            message: "Utilisateur connecté avec succès",
            token: token.access_token,
            user: {
                id: existingUser.id,
                name: existingUser.name,
                role: existingUser.role
            }
        }

    }

    async getProfile(userId: number) {
        const user = await this.usersService.getUserById(userId);
        console.log(user);

        if(!user) throw new UnauthorizedException({error : "Utilisateur introuvable"})

        return {userName: user.name, userId: user.id, userRole: user.role};
    }
}
