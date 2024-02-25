import { User } from 'src/data/entity/user.entity';

export class GameResultDto {
  roleId: number;

  userSession: string;

  roomSession: string;

  isWin: boolean;

  user: User;
}
