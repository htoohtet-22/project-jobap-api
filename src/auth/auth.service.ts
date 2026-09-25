import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const isEmailExisting = await this.usersService.findByEmail(dto.email);
    if (isEmailExisting) {
      throw new ConflictException('An account with this email already exists');
    }

    const isUsernameExisting = await this.usersService.findByUsername(dto.username);
    if (isUsernameExisting) {
      throw new ConflictException('An account with this username already exists');
    }

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.create({
      email: dto.email,
      password: hashed,
      username: dto.username,
    });

    return this.buildAuthResponse(user.id, user.username, user.email);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByUsername(dto.username);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const matches = await bcrypt.compare(dto.password, user.password);
    if (!matches) {
      throw new UnauthorizedException('Incorrect password');
    }

    return this.buildAuthResponse(user.id, user.username, user.email);
  }

  private buildAuthResponse(id: string, username: string, email: string) {
    const payload = { sub: id, username };
    return {
      accessToken: this.jwtService.sign(payload),
      user: { id, username, email },
    };
  }
}
