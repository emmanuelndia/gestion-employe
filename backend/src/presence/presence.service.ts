import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePresenceDto } from './dto/create-presence.dto';
import { presenceStatus } from '@prisma/client';

@Injectable()
export class PresenceService {
  constructor(private prisma: PrismaService) {}

  async create(createPresenceDto: CreatePresenceDto) {
    return this.prisma.presence.create({
      data: {
        employeeId: createPresenceDto.employeeId,
        date: new Date(createPresenceDto.date),
        date_arrivee: createPresenceDto.date_arrivee ? new Date(createPresenceDto.date_arrivee) : null,
        date_depart: createPresenceDto.date_depart ? new Date(createPresenceDto.date_depart) : null,
        status: createPresenceDto.status as presenceStatus,
      },
    });
  }

  async findAll(status?: string, startDate?: string, endDate?: string) {
    const where: any = {};
    if (status) where.status = status;
    if (startDate || endDate) {
      where.date = {};
      if (startDate && startDate.trim() !== '') {
        const d = new Date(startDate);
        if (!isNaN(d.getTime())) where.date.gte = d;
      }
      if (endDate && endDate.trim() !== '') {
        const d = new Date(endDate);
        if (!isNaN(d.getTime())) where.date.lte = d;
      }
      if (Object.keys(where.date).length === 0) delete where.date;
    }

    return this.prisma.presence.findMany({
      where,
      include: {
        employee: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async getStats(startDate?: string, endDate?: string) {
    const where: any = {};
    if (startDate || endDate) {
      where.date = {};
      if (startDate && startDate.trim() !== '') {
        const d = new Date(startDate);
        if (!isNaN(d.getTime())) where.date.gte = d;
      }
      if (endDate && endDate.trim() !== '') {
        const d = new Date(endDate);
        if (!isNaN(d.getTime())) where.date.lte = d;
      }
      if (Object.keys(where.date).length === 0) delete where.date;
    }

    const presences = await this.prisma.presence.findMany({ where });
    
    return {
      total: presences.length,
      present: presences.filter(p => p.status === 'present').length,
      absent: presences.filter(p => p.status === 'absent').length,
      retard: presences.filter(p => p.status === 'retard').length,
    };
  }

  async findByEmployee(employeeId: number) {
    return this.prisma.presence.findMany({
      where: { employeeId },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async update(id: number, data: Partial<CreatePresenceDto>) {
    const updateData: any = { ...data };
    if (data.date) updateData.date = new Date(data.date);
    if (data.date_arrivee) updateData.date_arrivee = new Date(data.date_arrivee);
    if (data.date_depart) updateData.date_depart = new Date(data.date_depart);
    
    return this.prisma.presence.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number) {
    return this.prisma.presence.delete({
      where: { id },
    });
  }
}
