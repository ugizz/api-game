import { User } from 'src/entity/user.entity';

export class GameResultDto {
  roleId: number;

  userSession: string;

  roomSession: string;

  isWin: boolean;

  user: User;
}
