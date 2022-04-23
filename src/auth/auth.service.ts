import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    console.log(user);
    if (user && user.password === pass) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log(user._doc);
    const payload = { _id: user._doc._id.toString(), username: user._doc.username, name: user._doc.name, surname: user._doc.surname };
    console.log(payload);
    return {
      token: this.jwtService.sign(payload),
    };
  }
}