import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { AuthService } from '../auth.service';
import { User } from '../entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

    constructor(
        private readonly authService: AuthService,
        configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate( payload: JwtPayload ): Promise<User> {
        const { userId: id } = payload;
        const user = await this.authService.findOneValidUserByIdOrError( id );
        return user;
    }

}