import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ReturnUserDto } from './dto/return-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPassword } from './helpers/hash-password';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  async createUser(createUserDto: CreateUserDto): Promise<{ message: string }> {
    try {
      const { email, password } = createUserDto;

      const existingUser = await this.prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new ConflictException('E-mail já cadastrado.');
      }

      const hashedPassword = await hashPassword(password);

      await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
      });

      return { message: 'Usuário cadastrado com sucesso!' };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao cadastrar usuário.');
    }
  }

  async findUserByEmail(email: string): Promise<ReturnUserDto> {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new NotFoundException('Usuário não encontrado.');
      }

      return new ReturnUserDto(user);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao buscar usuário por e-mail.');
    }
  }

  async findUserEntityByEmail(email: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new NotFoundException('Usuário não encontrado.');
      }

      return user;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao buscar usuário por e-mail.');
    }
  }

  async findUserById(id: number): Promise<ReturnUserDto> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id }
      });

      if (!user) {
        throw new NotFoundException('Usuário não encontrado.');
      }

      return new ReturnUserDto(user);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao buscar usuário por ID.');
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<ReturnUserDto> {
    try {

      const user = await this.prisma.user.findUnique({
        where: { id }
      });

      if (!user) {
        throw new NotFoundException('Usuário não existe, tente atualizar novamente.');
      }

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
      return new ReturnUserDto(updatedUser);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao atualizar usuário.');
    }
  }

  async removeUser(id: number): Promise<{ message: string }> {
    try {

      const user = await this.prisma.user.findUnique({
        where: { id }
      });

      if (!user) {
        throw new NotFoundException('Usuário não encontrado, tente remover novamente.');
      }

      await this.prisma.user.delete({ where: { id } });
      return { message: 'Usuário removido com sucesso.' };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao remover usuário.');
    }
  }
}
