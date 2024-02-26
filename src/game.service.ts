import { Injectable } from '@nestjs/common';
import { GameResultDto } from './data/dto/request/game.result.create.dto';
import { RoleRepository } from './role.repository';
import { GameRepository } from './game.repository';
import { User } from './data/entity/user.entity';
import { ResultListDto } from './data/dto/response/game.result.list.dto';

@Injectable()
export class GameService {
  constructor(
    private roleRepository: RoleRepository,
    private gameRepository: GameRepository,
  ) {}

  async gameRecord(gameResultDto: GameResultDto): Promise<any> {
    const { roleId, userSession, roomSession, isWin, user } = gameResultDto;

    const role = await this.roleRepository.findRole(roleId);

    return this.gameRepository.createResult(
      user,
      role,
      userSession,
      roomSession,
      isWin,
    );
  }

  async findResult(user: User): Promise<ResultListDto[]> {
    return await this.gameRepository.findResult(user.userId);
  }
}
