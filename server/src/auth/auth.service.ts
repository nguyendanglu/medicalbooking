import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) { }

  async register(data: any) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });
  }

  async login(email: string, pass: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log(`Login failed: user with email ${email} not found`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      console.log(`Login failed: Invalid password for ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const { password, ...result } = user;

    return {
      message: 'Login successful',
      user: result,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async seedAdmins() {
    const roles = ['ADMIN', 'DOCTOR', 'STAFF'];
    const createdUsers: string[] = [];


    for (const role of roles) {
      const email = `${role.toLowerCase()}@clinic.com`;
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!existingUser) {
        const hashedPassword = await bcrypt.hash('P@ssw0rd123', 10);
        const newUser = await this.prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            firstName: 'Test',
            lastName: role,
            role,
          },
        });
        createdUsers.push(newUser.email);
      }
    }

    return {
      message: 'Seed completed',
      createdUsers,
    };
  }

  async validateToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      
      const adminRoles = ['ADMIN', 'DOCTOR', 'STAFF'];
      if (!adminRoles.includes(payload.role)) {
        throw new UnauthorizedException('Insufficient privileges. Admin access required.');
      }
      
      return {
        valid: true,
        user: payload
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired token.');
    }
  }
}
