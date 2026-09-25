import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateApplicationDto } from './dto/create-application.dto.js';
import { UpdateApplicationDto } from './dto/update-application.dto.js';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  create(userId: string, dto: CreateApplicationDto) {
    return this.prisma.application.create({
      data: {
        ...dto,
        dateApplied: dto.dateApplied ? new Date(dto.dateApplied) : undefined,
        followUpDate: dto.followUpDate ? new Date(dto.followUpDate) : undefined,
        userId,
      },
    });
  }

  findAll(userId: string) {
    return this.prisma.application.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, id: string) {
    const application = await this.prisma.application.findUnique({ where: { id } });
    if (!application) throw new NotFoundException('application not found');
    if (application.userId !== userId) throw new ForbiddenException();
    return application;
  }

  async update(userId: string, id: string, dto: UpdateApplicationDto) {
    await this.findOne(userId, id);
    return this.prisma.application.update({
      where: { id },
      data: {
        ...dto,
        dateApplied: dto.dateApplied ? new Date(dto.dateApplied) : undefined,
        followUpDate: dto.followUpDate ? new Date(dto.followUpDate) : undefined,
      },
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    await this.prisma.application.delete({ where: { id } });
    return { success: true };
  }
}