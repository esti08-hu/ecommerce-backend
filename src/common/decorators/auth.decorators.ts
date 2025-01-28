import {
  ExecutionContext,
  SetMetadata,
  createParamDecorator,
} from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

interface AccessTokenPayload {
  email: string;
  role: string;
}

export const GetUser = createParamDecorator(
  (_, ctx: ExecutionContext): AccessTokenPayload => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
