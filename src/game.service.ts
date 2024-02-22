import { Injectable } from '@nestjs/common';
import { GameResultDto } from './dto/game.result.create.dto';
import { RoleRepository } from './role.repository';
import { GameRepository } from './game.repository';
import { User } from './entity/user.entity';

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
}
