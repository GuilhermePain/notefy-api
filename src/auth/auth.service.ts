import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService
    ) { }

    async signIn(params: Prisma.UserCreateInput): Promise<{ access_token: string }> {
        const user = await this.userService.findUser({ email: params.email });
        if (!user) throw new NotFoundException("Email ou senha incorretos.")

        const passwordIsMatch = await bcrypt.compare(params.password, user.password)
        if (!passwordIsMatch) throw new UnauthorizedException("Email ou senha incorretos.")

        const payload = { sub: user.id, username: user.name }

        return {
            access_token: await this.jwtService.signAsync(payload)
        }

    }

    async forgotPassword(email: string): Promise<void> {

        try {
            const resetToken = this.jwtService.signAsync(
                { email: email },
                { secret: process.env.SECRET, expiresIn: '1h' }
            )

            await this.mailService.sendResetPasswordEmail(email, await resetToken)
        } catch (error) {
            console.log(error);
        }
    }
    
    async resetPassword(token: string, newPassword: string): Promise<void> {
        try {
            const payload = this.jwtService.verify(token, { secret: process.env.SECRET });
            const user = await this.userService.findUser({ email: payload.email });
            if (!user) throw new NotFoundException('Usuário não encontrado.');
    
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await this.userService.update(user.id, { password: hashedPassword });
        } catch (error) {
            console.log(error);
        }
    }
}