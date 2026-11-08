import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  QueryMethod,
} from '@nestjs/common';
import { RoleService } from './role.service.js';
import { CreateRoleDto } from './dto/create-role.dto.js';

@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @QueryMethod()
  index(@Body('page') page: number, @Body('limit') limit: number): unknown {
    return {
      page: page,
      limit: limit,
      data: this.roleService.index(page, limit),
    };
  }

  @Post()
  store(@Body() data: CreateRoleDto): unknown {
    return this.roleService.store(data);
  }

  @Get(':id')
  view(@Param('id') id: string): unknown {
    return this.roleService.view(Number(id));
  }
}
