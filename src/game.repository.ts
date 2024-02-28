import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Game } from './data/entity/game.entity';
import { Role } from './data/entity/role.entity';
import { User } from './data/entity/user.entity';
import { ResultListDto } from './data/dto/response/game.result.list.dto';

@Injectable()
export class GameRepository extends Repository<Game> {
  constructor(dataSorce: DataSource) {
    super(Game, dataSorce.createEntityManager());
  }

  async createResult(
    userId: User,
    roleId: Role,
    userSession: string,
    roomSession: string,
    isWin: boolean,
  ): Promise<any> {
    const game = this.create({ userId, roleId, isWin });

    const result = await this.createQueryBuilder()
      .insert()
      .into(Game)
      .values({
        userId: userId,
        roleId: roleId,
        userSession: userSession,
        roomSession: roomSession,
        isWin: isWin,
      })
      .execute();

    return 'success';
  }

  async findResult(userId: number): Promise<ResultListDto[]> {
    return await this.createQueryBuilder('tb_game')
      .select([
        'tb_role.role_name AS role_name',
        'played_at',
        'is_win',
        'tb_user.nickname AS nickname',
      ])
      .innerJoin(
        'tb_game.userId',
        'tb_user',
        'tb_game.user_id = tb_user.user_id',
      )
      .innerJoin(
        'tb_game.roleId',
        'tb_role',
        'tb_game.role_id = tb_role.role_id',
      )
      .where('tb_game.user_id = :userId ', { userId: userId })
      .orderBy('played_at', 'DESC')
      .execute();
  }
}
