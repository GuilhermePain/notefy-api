import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/database.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  @Inject()
  private readonly prisma: PrismaService

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashSenha = await bcrypt.hash(createUserDto.password, 10)
    return this.prisma.user.create({ data: { ...createUserDto, password: hashSenha } })
  }

  // Nova função para buscar todos os usuários
  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  findUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      include: {
        notes: true
      }
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      data: updateUserDto,
      where: { id: id }
    })
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id: id },
    })
  }
}
