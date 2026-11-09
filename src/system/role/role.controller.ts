import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  QueryMethod,
} from '@nestjs/common';
import { RoleService } from './role.service.js';
import { CreateRoleDto } from './dto/create-role.dto.js';
import { UpdateRoleDto } from './dto/update-role.dto.js';

@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @QueryMethod()
  index(
    @Body('page', ParseIntPipe) page: number,
    @Body('limit', ParseIntPipe) limit: number,
    @Body('search') search: string,
  ): unknown {
    return {
      page: page,
      limit: limit,
      data: this.roleService.index(page, limit, search),
    };
  }

  @Post()
  store(@Body() data: CreateRoleDto): unknown {
    return this.roleService.store(data);
  }

  @Get(':id')
  view(@Param('id', ParseIntPipe) id: number): unknown {
    return this.roleService.view(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateRoleDto,
  ): unknown {
    return this.roleService.update(id, data);
  }

  @Delete(':id')
  destroy(@Param('id', ParseIntPipe) id: number): unknown {
    return this.roleService.destroy(id);
  }
}
