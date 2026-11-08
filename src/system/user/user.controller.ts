import { Body, Controller, Get, QueryMethod } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get()
  getUsers(): string {
    return 'List of users';
  }

  @QueryMethod('/lists')
  getUserById(@Body('id') id: string): Record<string, string> {
    return {
      id: id,
      name: 'John Doe',
      email: 'john@email.com',
    };
  }
}
