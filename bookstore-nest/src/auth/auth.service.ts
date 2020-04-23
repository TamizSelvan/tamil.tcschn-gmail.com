import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

   
    constructor(private userService:UsersService) {}

    async ValidateUser(username:string,password:string):Promise<any>
    {
        const user = await this.userService.FindUser(username);

        if(user&& user.password ==password)
        {
            const{password,...result} = user; // Removing the password field from the user.
            return result;
        }
        return null;
    }
}
