import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { typeORMConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entity/game.entity';
import { GameRepository } from './game.repository';
import { RoleRepository } from './role.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    TypeOrmModule.forFeature([Game]),
  ],
  controllers: [GameController],
  providers: [GameService, GameRepository, RoleRepository],
})
export class GameModule {}
