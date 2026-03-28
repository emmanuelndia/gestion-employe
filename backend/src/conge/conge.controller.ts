import { 
    Controller, Get, Post, Body, Patch, Param, UseGuards, Request, ForbiddenException 
} from '@nestjs/common';
import { CongeService } from './conge.service';
import { CreateCongeDto } from './dto/create-conge.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role, congeStatus } from '@prisma/client';

@Controller('conge')
@UseGuards(AuthGuard, RolesGuard)
export class CongeController {
    constructor(private readonly congeService: CongeService) {}

    // Demander un congé (Accessible par USER et ADMIN)
    @Post()
    @Roles(Role.USER, Role.ADMIN)
    async create(@Body() createCongeDto: CreateCongeDto, @Request() req: any) {
        const employeeId = req.user.employeeId;
        if (!employeeId) {
            throw new ForbiddenException("Cet utilisateur n'est pas lié à un employé et ne peut pas demander de congé.");
        }
        return this.congeService.create(createCongeDto, employeeId);
    }

    // Récupérer toutes les demandes (Admin uniquement)
    @Get()
    @Roles(Role.ADMIN)
    async findAll() {
        return this.congeService.findAll();
    }

    // Récupérer ses propres demandes
    @Get('my-requests')
    @Roles(Role.USER, Role.ADMIN)
    async findMyRequests(@Request() req: any) {
        const employeeId = req.user.employeeId;
        if (!employeeId) {
            throw new ForbiddenException("Cet utilisateur n'est pas lié à un employé.");
        }
        return this.congeService.findByEmployee(employeeId);
    }

    // Approuver ou refuser une demande (Admin uniquement)
    @Patch(':id/status')
    @Roles(Role.ADMIN)
    async updateStatus(
        @Param('id') id: string,
        @Body('status') status: congeStatus,
    ) {
        return this.congeService.updateStatus(parseInt(id), status);
    }
}
