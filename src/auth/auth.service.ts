import { Injectable, NotFoundException } from '@nestjs/common';
import { ReadUserDto } from 'src/users/dto/read-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private readonly usersService : UsersService,
    private readonly jwtService: JwtService  ) {}
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if(user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(readUserDto: ReadUserDto) {
   const foundUser = this.usersService.findOne(readUserDto.email);
  if (!foundUser){
    return new NotFoundException();
  }
  if ((await foundUser).password !== readUserDto.password){
    throw new NotFoundException();
  }
  if((await foundUser).password !== readUserDto.password) {
    throw new NotFoundException();
  }
  const payload = {
    createdAt: new Date().toDateString(),
    sub: (await foundUser)._id,
    role: ''
  };
  if((await foundUser).email === "dim@t.fr"){
    payload.role = 'admin';
  }else{
    payload.role = 'user';
  }
  return {
    access_token: this.jwtService.sign(payload)
  }
  }
}
