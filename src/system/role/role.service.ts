import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto.js';
import { UpdateRoleDto } from './dto/update-role.dto.js';

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

  index(page: number, limit: number, search: string): Role[] {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const roles = this.roles.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );

    if (roles.length <= 0) throw new NotFoundException(`Data not found`);

    return roles.slice(startIndex, endIndex);
  }

  store(data: CreateRoleDto) {
    this.roles.push({
      id: this.roles.length + 1,
      ...data,
    });

    return this.roles.at(-1);
  }

  view(id: number): Role {
    const role = this.roles.find((role) => role.id === id);

    if (!role) {
      throw new NotFoundException(`Data not found`);
    }

    return role;
  }

  update(id: number, data: UpdateRoleDto) {
    let role = this.roles.find((role) => role.id === id);

    if (!role) {
      throw new NotFoundException(`Data not found`);
    }

    this.roles = this.roles.filter((item) => item.id !== id);

    role = {
      id: role.id,
      ...data,
    };

    this.roles.push(role);

    return role;
  }

  destroy(id: number): Role {
    const role = this.roles.find((role) => role.id === id);

    if (!role) {
      throw new NotFoundException(`Data not found`);
    }

    this.roles = this.roles.filter((role) => role.id !== id);

    return role;
  }
}
