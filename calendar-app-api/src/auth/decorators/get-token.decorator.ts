import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const GetToken = createParamDecorator(
  ( data: string, ctx: ExecutionContext ) => {
    const req = ctx.switchToHttp().getRequest();
    const token = req.headers.authorization.split(' ')[1];
    if ( !token )
      throw new InternalServerErrorException('Token not found (request)');
    return token;
  }
);