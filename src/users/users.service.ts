import {
  Injectable,
  Body,
  BadRequestException,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserSignUpDto } from './dto/user-signup.dto';
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';
import { UserSignInDto } from './dto/user-signin.dto';
import { sign, SignOptions } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async signup(userSignUpDto: UserSignUpDto): Promise<UserEntity> {
    const userExits = await this.findUserByEmail(userSignUpDto.email);
    if (userExits) throw new BadRequestException('Email is not available');

    userSignUpDto.password = await bcrypt.hash(userSignUpDto.password, 10);
    const user = await this.usersRepository.save(
      this.usersRepository.create(userSignUpDto),
    );

    return omit(user, ['password']);
  }

  async signin(userSignInDto: UserSignInDto): Promise<UserEntity> {
    const userExits = await this.usersRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email = :email', { email: userSignInDto.email })
      .getOne();

    if (!userExits) {
      throw new BadRequestException('Please enter the correct email');
    }

    const matchPassword = await bcrypt.compare(
      userSignInDto.password,
      userExits.password,
    );

    if (!matchPassword) {
      throw new BadRequestException('Please enter the correct password');
    }

    return omit(userExits, ['password']);
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    if (isNaN(id)) {
      throw new Error('Invalid ID value');
    }
    return await this.usersRepository.findOne({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async accessToken(user: UserEntity): Promise<string> {
    const secret = process.env.ACCESS_TOKEN_SECRET_KEY;
    const expiresIn = process.env.ACCESS_TOKEN_EXPIRE_TIME;

    if (!secret || !expiresIn) {
      throw new Error(
        'JWT secret or expiration time is not defined in environment variables',
      );
    }

    const options: SignOptions = {
      expiresIn: expiresIn as SignOptions['expiresIn'],
    };

    return sign({ id: user.id, email: user.email }, secret, options);
  }
}
