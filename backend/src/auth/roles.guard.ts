import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    
    // In our AuthGuard, we put the payload in request['user'].
    // The payload currently only has { id }.
    // We might need to update AuthGuard to include role in the payload 
    // or fetch the user from the database here.
    // However, if the payload has role, it's more efficient.
    
    return requiredRoles.some((role) => user.role === role);
  }
}
