import { SetMetadata } from "@nestjs/common";

export enum UserRole{
    admin = 'amin',
    user = 'user',
    unknown = 'unknown'
}

// export const ROLES_KEY = 'ROLES';
// export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);