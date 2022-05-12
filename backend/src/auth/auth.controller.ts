import { Controller, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UsersService){}

    @Post()
    public async login(){

    }
}
