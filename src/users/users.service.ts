import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  
  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
  
  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }

  create(data: { email: string, password: string, username: string }) {
    return this.prisma.user.create({ data });
  }
}
