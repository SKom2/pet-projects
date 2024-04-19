import { PrismaService } from '../prisma.service';
import { AuthDto } from './dto/auth.dto';
import { hash } from 'argon2';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        password: false,
      },
    });
  }

  async getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async createUser(dto: AuthDto) {
    const user = {
      name: dto.name,
      email: dto.email,
      password: await hash(dto.password),
    };

    return this.prisma.user.create({
      data: user,
    });
  }
}
