import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Role } from './data/entity/role.entity';

@Injectable()
export class RoleRepository extends Repository<Role> {
  constructor(dateSorce: DataSource) {
    super(Role, dateSorce.createEntityManager());
  }

  async findRole(roleId: number): Promise<Role> {
    return this.findOne({ where: { roleId } });
  }
}
