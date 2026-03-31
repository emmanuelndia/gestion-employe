import { Injectable } from '@nestjs/common';
import { Employee } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeeService {
    constructor(private prisma: PrismaService) {}

    // Récuperer les employés
    async getEmployees() {
        try{
            const employees = await this.prisma.employee.findMany();
            return employees.map(emp => ({
                ...emp,
                date_naissance: emp.date_naissance.toISOString().split('T')[0]
            }));
        } catch (error) {
            console.log('error ::::', error);
            throw new Error("Impossible de récupérer les employés");
        }
    }

    // Récuperer un employe par id
    async getEmployeeById(id: number) {
        try{
            const employee = await this.prisma.employee.findUnique({
                where: {
                    id: id
                }
            });
            return employee ? {
                ...employee,
                date_naissance: employee.date_naissance.toISOString().split('T')[0]
            } : null;
        } catch (error) {
            console.log('error ::::', error);
            throw new Error("Impossible de récupérer l'employé");
        }
    }

    // Créer un utilisateur
    async create(employee: Employee) {
        try {
            const dateNaissance = new Date(employee.date_naissance);
            if (isNaN(dateNaissance.getTime())) {
                throw new Error("Date de naissance invalide");
            }

            await this.prisma.employee.create({
                data: {
                    ...employee,
                    date_naissance: dateNaissance,
                }
            });
            return { message: `Employé ${employee.nom} ${employee.prenom} créé avec succès` };
        } catch (error) {
            console.log('error ::::', error);
            throw new Error("Impossible de créer l'employé");
        }
    }

    // Mettre à jour un employé
    async update(id: number, employee: Employee) {
        try {
            const dateNaissance = new Date(employee.date_naissance);
            if (isNaN(dateNaissance.getTime())) {
                throw new Error("Date de naissance invalide");
            }

            await this.prisma.employee.update({
                where: {
                    id: id
                },
                data: {
                    ...employee,
                    date_naissance: dateNaissance,
                }
            });
            return { message: `Employé ${employee.nom} ${employee.prenom} mis à jour avec succès` };
        } catch (error) {
            console.log('error ::::', error);
            throw new Error("Impossible de mettre à jour l'employé");
        }
    }

    


    
    // Supprimer un employé
    async delete(id: number) {
        try {
            await this.prisma.employee.delete({
                where: {
                    id: id
                }
            });
            return { message: `Employé avec l'ID ${id} supprimé avec succès` };
        } catch (error) {
            console.log('error ::::', error);
            throw new Error("Impossible de supprimer l'employé");
        }
    }
}
