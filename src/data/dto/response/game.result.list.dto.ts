import { User } from 'src/data/entity/user.entity';

export class ResultListDto {
  role_name: string;

  played_at: Date;

  is_win: boolean;

  nickname: string;
}
