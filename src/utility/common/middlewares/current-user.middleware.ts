import { CurrentUser } from 'src/utility/decorators/current-user.decorator'; // Correct import
import { Injectable, NestMiddleware } from '@nestjs/common';
import { isArray } from 'class-validator';
import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/entities/user.entity';

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserEntity;
    }
  }
}

interface MyJwtPayload {
  id: string;
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (
      !authHeader ||
      isArray(authHeader) ||
      !authHeader.startsWith('Bearer ')
    ) {
      req.currentUser = req.currentUser ?? undefined;
      return next();
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.ACCESS_TOKEN_SECRET_KEY;

    if (!secret) {
      console.error('JWT Secret is missing in environment variables.');
      return next();
    }

    try {
      const decoded = verify(token, secret) as MyJwtPayload;

      console.log('Decoded JWT:', decoded);

      if (!decoded?.id) {
        return next();
      }

      const numericId = +decoded.id;

      if (isNaN(numericId)) {
        console.error('ID from token is not numeric:', decoded.id);
        return next();
      }

      const currentUser = await this.userService.findOne(numericId);
      req.currentUser = currentUser ?? undefined;

      console.log('Authenticated user:', currentUser);
    } catch (err) {
      console.error('JWT verification failed:', err.message);
    }
    next();
  }
}
