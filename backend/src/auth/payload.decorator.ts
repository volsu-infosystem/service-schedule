import { createParamDecorator } from '@nestjs/common';

export const AuthPayload = createParamDecorator((data, req) => {
  return req;
});
