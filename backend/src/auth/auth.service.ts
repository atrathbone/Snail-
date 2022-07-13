import {
  HttpException,
  Injectable,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/user.model';
import { UsersService } from 'src/users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.validateUser(authLoginDto);
    const payload = {
      userId: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '10h',
      }),
      expiresIn: 36000,
    };
  }

  async validateUser(authLoginDto: AuthLoginDto): Promise<IUser> {
    const { username, password } = authLoginDto;
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new HttpException('invalid credentials', HttpStatus.BAD_REQUEST);
    }
    if (!(await this.usersService.validatePassword(password, user.password))) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
