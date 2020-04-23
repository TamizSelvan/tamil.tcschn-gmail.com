import { AuthService } from './auth.service';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {PassportStrategy} from'@nestjs/passport'
@Injectable()

export class LocalStrategy extends PassportStrategy(Strategy){
   
    constructor(private authService:AuthService) {
        super();
        
    }

    async Validate(username:string,password:string): Promise<any>{
        const user= await this.authService.ValidateUser(username,password);
        if(!user){
            throw new UnauthorizedException();
        }
        return user;    
    }
}
