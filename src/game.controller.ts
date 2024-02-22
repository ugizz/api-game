import { Controller, Get } from '@nestjs/common';
import { GameService } from './game.service';
import { GameResultDto } from './dto/game.result.create.dto';
import { MessagePattern } from '@nestjs/microservices';
import { ResponseEntity } from './configs/ResponseEntity';

@Controller()
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @MessagePattern('create')
  async create(gameResultDto: GameResultDto): Promise<ResponseEntity<string>> {
    await this.gameService.gameRecord(gameResultDto);
    return ResponseEntity.OK();
  }
}
