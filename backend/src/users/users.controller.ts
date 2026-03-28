import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import * as client from '@prisma/client';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // Get tous les users
    @Get()
    async getUsers(){
        const users = await this.usersService.getUsers();

        if (!users) {
            throw new Error("Utilisateurs non trouvés");
        }
        
        return users.map(user => ({
            id: user.id,
            name: user.name,
            role: user.role,
            createdAt: user.createdAt,
        }));
    }

    // Get un user par id
    @Get(':id')
    async getUser(@Param('id') id: string){
        const user = await this.usersService.getUserById(parseInt(id));

        if (!user) {
            throw new Error("Utilisateur non trouvé");
        }

        return {
            name: user.name,
            role: user.role,
        };
    }
    
    // Créer un user    
    @Post()
    async createUser(@Body() user: client.User){
        const userExist = await this.usersService.findByName(user.name);

        if (userExist) {
            throw new Error("Utilisateur déjà existant");
        }
        return this.usersService.create(user);
    }

    // Modifier un user
    @Put(':id')
    async updateUser(@Param('id') id:string, @Body() user: client.User){
        return this.usersService.updateUser(parseInt(id), user);
    }


    // Delete un user
    @Delete(':id')
    async deleteUser(@Param('id') id:string){
        return this.usersService.deleteUser(parseInt(id));
    }

}
