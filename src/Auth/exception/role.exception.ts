import { ForbiddenException } from "@nestjs/common";

export class ForbiddenRoleException extends ForbiddenException{
    constructor (role: string){
    super(`you dont have the required role: ${role}`)
    }
}