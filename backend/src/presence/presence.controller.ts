import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PresenceService } from './presence.service';
import { CreatePresenceDto } from './dto/create-presence.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('presence')
@UseGuards(AuthGuard, RolesGuard)
export class PresenceController {
  constructor(private readonly presenceService: PresenceService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createPresenceDto: CreatePresenceDto) {
    return this.presenceService.create(createPresenceDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  findAll(
    @Query('status') status?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.presenceService.findAll(status, startDate, endDate);
  }

  @Get('stats')
  @Roles(Role.ADMIN)
  getStats(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.presenceService.getStats(startDate, endDate);
  }

  @Get('employee/:id')
  @Roles(Role.ADMIN)
  findByEmployee(@Param('id') id: string) {
    return this.presenceService.findByEmployee(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updatePresenceDto: Partial<CreatePresenceDto>) {
    return this.presenceService.update(+id, updatePresenceDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.presenceService.remove(+id);
  }
}
