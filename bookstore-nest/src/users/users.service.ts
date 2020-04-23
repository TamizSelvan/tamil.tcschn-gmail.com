import { Injectable } from '@nestjs/common';
export type UserArray = any;

@Injectable()
export class UsersService {

    private readonly users: UserArray[];
    /**
     *
     */
    constructor() {
        this.users=[

            {
                Id:1,
                username:'Admin',
                password:'Hello123'
            },
            {
                Id:2,
                username:'Tamil',
                password:'Test@123'
            }
        ];
        
    }

    async  FindUser(username:string):Promise<UserArray | undefined>
    {
return this.users.find(usr=>usr.username ==username);
    }


}
