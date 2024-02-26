import { Controller, Get } from '@nestjs/common';
import { GameService } from './game.service';
import { GameResultDto } from './data/dto/request/game.result.create.dto';
import { MessagePattern } from '@nestjs/microservices';
import { ResponseEntity } from './configs/ResponseEntity';
import { User } from './data/entity/user.entity';
import { ResultListDto } from './data/dto/response/game.result.list.dto';

@Controller()
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @MessagePattern('create')
  async create(gameResultDto: GameResultDto): Promise<ResponseEntity<string>> {
    await this.gameService.gameRecord(gameResultDto);
    return ResponseEntity.OK();
  }

  @MessagePattern('getresult')
  async getresult(user: User): Promise<ResponseEntity<ResultListDto[]>> {
    return ResponseEntity.OK_WITH(await this.gameService.findResult(user));
  }
}
