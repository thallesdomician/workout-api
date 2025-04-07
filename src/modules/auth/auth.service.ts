import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private i18n: I18nService,
  ) {}

  async register(data: { email: string; password: string; name?: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new ConflictException(
        this.i18n.t('common.errors.conflict', {
          args: {
            entity: 'user',
          },
        }),
      );
    }

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
      },
    });
    const token = this.generateToken(user.id, user.email);
    return {
      user: {
        token,
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
    };
  }

  async login(data: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException(
        this.i18n.t('common.errors.invalidCredentials'),
      );
    }
    const token = this.generateToken(user.id, user.email);
    return {
      user: {
        token,
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
    };
  }

  async getMe(user: { userId: string }) {
    return this.prisma.user.findUnique({
      where: { id: user.userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
  }

  private generateToken(sub: string, email: string) {
    return this.jwtService.sign({
      sub,
      email,
    });
  }
}
