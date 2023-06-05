import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';

import { CreateUserDto, LoginUserDto, UpdateUserDto, UserResponseDto } from './dtos';
import { JwtPayload } from './interfaces';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  createUser = async (createUserDto: CreateUserDto): Promise<UserResponseDto> =>  {
    const { password, ...userData } = createUserDto;
    const userExits = await this.findOneUserByEmail(userData.email);
    if (userExits) throw new BadRequestException('User already exists');
    const user = new this.userModel(userData);
    user.password = await bcrypt.hash(password, 10);
    const newUser = await user.save();
    return {
      id: newUser.id,
      email: newUser.email,
      fullName: newUser.fullName,
      token: await this.getJwtToken({ userId: newUser.id })
    }
  };

  login = async (loginUserDto: LoginUserDto) : Promise<UserResponseDto> => {
    const user = await this.findOneUserByEmail(loginUserDto.email);
    if (!user) throw new BadRequestException('Invalid credentials');
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      token: await this.getJwtToken({ userId: user.id })
    }
  };

  refreshToken = async (user: User, token: String): Promise<any> =>  {
    if (!token) throw new BadRequestException('Invalid token');
    const tokenPayload = this.jwtService.decode(token.toString()) as JwtPayload;
    if (tokenPayload.userId !== user.id) throw new BadRequestException('Invalid token');
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      token: await this.getJwtToken({ userId: user.id })
    };
  };

  updateUser = async (updateUserDto: UpdateUserDto): Promise<UserResponseDto> => {
    const { password, id, ...userData } = updateUserDto;
    const changes = new UpdateUserDto(userData);
    if (password) {
      changes.password = await bcrypt.hash(password, 10);
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(id, changes, { new: true }).exec();
    if (!updatedUser) throw new NotFoundException('User not found');
    return {
      id: updatedUser.id,
      email: updatedUser.email,
      fullName: updatedUser.fullName,
      token: await this.getJwtToken({ userId: updatedUser.id })
    }
  };

  private getJwtToken = async ( payload: JwtPayload ): Promise<string> => {
    const token = await this.jwtService.signAsync( payload );
    return token;
  }

  findOneValidUserByIdOrError = async (id: string) : Promise<User> => {
    const user = await this.findOneUserById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  findOneUserById = async (id: string): Promise<User | null> => {
    const user = await this.userModel.findById(id).select('+password');
    return user;
  };

  findOneUserByEmail = async (email: string): Promise<User | null> => {
    const user = await this.userModel.findOne({ email }).select('+password').exec();
    return user;
  };
}
