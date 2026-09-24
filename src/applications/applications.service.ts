import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApplicationStatus } from '../generated/prisma/enums';

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
}