import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { IUuidService, UUID } from '../uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(UUID) private readonly uuid: IUuidService,
  ) {}

  async login(user: LoginUserDto) {
    const payload = { username: user.username, sub: this.uuid.newUuid() };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
