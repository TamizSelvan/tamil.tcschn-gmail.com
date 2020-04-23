import { Controller, Get ,UseGuards, Request,Post} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
AuthGuard

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
    @UseGuards(AuthGuard('local'))
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('auth/login')
  async login(@Request() req){
    return req.user;
  }
}
