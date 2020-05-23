import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

   
    constructor(private userService:UsersService, private jwtService: JwtService) {}

    async ValidateUser(username:string,password:string):Promise<any>
    {
        // const user = await this.userService.FindUser(username);
        const user = await this.userService.FindUser('Tamil');

        if(user)
        {
            const{password,...result} = user; // Removing the password field from the user.
            return result;
        }
        return null;
    }

    async login(user:any){
        const payload = {username:123,sub:123};
        return{
            access_token: this.jwtService.sign(payload)
        }
    }
}
