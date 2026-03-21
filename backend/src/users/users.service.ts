import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { hash } from 'bcrypt';
import { User } from 'generated/prisma';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    // Fonction pour hasher le mot de passe
    private async hashPassword(password: string) {
        const hashedPassword = await hash(password, 9)
        return hashedPassword 
    }

    // Fonction pour créer un utilisateur
    async create(user: User) {
        const userHashedPassword = await this.hashPassword(user.password)
        try {
            await this.prisma.user.create({
                data: {
                    name: user.name, 
                    password: userHashedPassword,
                    role: user.role
                }
            });
            return "Utilisateur créé avec succès"
        } catch (error) {
            console.log('error ::::', error)
            throw new Error("Impossible de créer l'utilisateur")
        }
    }

    // Fonction pour récupérer tous les utilisateurs 
    async getUsers() {
        try {
            const users = await this.prisma.user.findMany();
            return users;
        } catch (error) {
            console.log('error ::::', error)
            throw new Error("Impossible de récupérer les utilisateurs")
        }
    }

    // Fonction pour récupérer un utilisateur par son id
    async getUserById(id: number) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: id
                }
            });
            return user;
        } catch (error) {
            console.log('error ::::', error)
            throw new Error("Impossible de récupérer l'utilisateur")
        }
    }

    // Fonction pour mettre à jour un utilisateur
    async updateUser(id: number, user: User) {
        const userHashedPassword = await this.hashPassword(user.password)
        try {
            await this.prisma.user.update({
                where: {
                    id
                },
                data: {
                    name: user.name, 
                    password: userHashedPassword,
                    role: user.role
                },   
            });
        } catch (error) {
            console.log('error ::::', error)
            throw new Error("Impossible de mettre à jour l'utilisateur")
        }
    }
    
}
