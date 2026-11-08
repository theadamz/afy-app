import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto.js';

interface Role {
  id: number;
  name: string;
  description: string;
}

@Injectable()
export class RoleService {
  private roles: Role[] = [
    { id: 1, name: 'Admin', description: 'Administrator role' },
    { id: 2, name: 'User', description: 'Regular user role' },
  ];

  index(page: number, limit: number): Role[] {
    return this.roles;
  }

  view(id: number): Role {
    const role = this.roles.find((role) => role.id === id);

    if (!role) {
      throw new NotFoundException(`Data not found`);
    }

    return role;
  }

  store(data: CreateRoleDto) {
    this.roles.push({
      id: this.roles.length + 1,
      ...data,
    });

    return this.roles.at(-1);
  }
}
