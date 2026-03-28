import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCongeDto } from './dto/create-conge.dto';
import { congeStatus } from '@prisma/client';

@Injectable()
export class CongeService {
    constructor(private prisma: PrismaService) {}

    // Créer une demande de congé
    async create(createCongeDto: CreateCongeDto, employeeId: number) {
        return this.prisma.conge.create({
            data: {
                ...createCongeDto,
                date_debut: new Date(createCongeDto.date_debut),
                date_fin: new Date(createCongeDto.date_fin),
                employeeId,
            },
        });
    }

    // Récupérer toutes les demandes (pour Admin)
    async findAll() {
        return this.prisma.conge.findMany({
            include: {
                employee: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    // Récupérer les demandes d'un employé spécifique
    async findByEmployee(employeeId: number) {
        return this.prisma.conge.findMany({
            where: { employeeId },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    // Mettre à jour le statut d'une demande (Accepter/Refuser)
    async updateStatus(id: number, status: congeStatus) {
        const conge = await this.prisma.conge.findUnique({ where: { id } });
        if (!conge) {
            throw new NotFoundException(`Demande de congé avec l'ID ${id} introuvable`);
        }

        return this.prisma.conge.update({
            where: { id },
            data: { status },
        });
    }
}
