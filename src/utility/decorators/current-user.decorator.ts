import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Correctly define and export `CurrentUser` as the decorator.
export const CurrentUser = createParamDecorator(
  (data: never, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.currentUser;
  },
);
