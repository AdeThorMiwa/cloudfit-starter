import { Body, Controller, Get, Post } from '@nestjs/common';
import AppService from '@app/service';
import { CreateUserDto } from '@app/dto';

@Controller()
class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getUsers(): Promise<any> {
    return await this.appService.users({});
  }

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<any> {
    return await this.appService.createUser({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
      uid: Date.now().toString(),
    });
  }
}

export default AppController;
