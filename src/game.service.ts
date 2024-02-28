import { Injectable } from '@nestjs/common';
import { GameResultDto } from './data/dto/request/game.result.create.dto';
import { RoleRepository } from './role.repository';
import { GameRepository } from './game.repository';
import { User } from './data/entity/user.entity';
import { ResultListDto } from './data/dto/response/game.result.list.dto';
import { LCDClient, MnemonicKey, MsgExecuteContract } from '@xpla/xpla.js';

/**
 * 진행중...
 */
// 클라이언트 정보
const lcd = new LCDClient({
  chainID: 'cube_47-5',
  URL: 'https://cube-lcd.xpla.dev',
});
// 토큰 발행하는 주체의 니모닉
const mk = new MnemonicKey({
  mnemonic: process.env.MNEMONIC,
});
const wallet = lcd.wallet(mk);
const myWalletAddress = wallet.key.accAddress;

// UTT토큰 컨트랙 주소
const cw20_contract =
  'xpla1txxskcf8h0thu34pwtaehkdeyccmtj8sxyshfxayzhdu4z2nuzmq88kjf3';

@Injectable()
export class GameService {
  constructor(
    private roleRepository: RoleRepository,
    private gameRepository: GameRepository,
  ) {}

  async gameRecord(gameResultDto: GameResultDto): Promise<any> {
    const { roleId, userSession, roomSession, isWin, user } = gameResultDto;

    /**
     * 진행중... user의 wallet으로 변경 예정
     */
    const transferMsg = new MsgExecuteContract(myWalletAddress, cw20_contract, {
      transfer: {
        recipient: 'xpla1pe4626stfy4z3rfdq09a37lk25q8qml0lxs5jn', // user.wallet
        amount: '1000000',
      },
    });

    const role = await this.roleRepository.findRole(roleId);
    const signedTx = await lcd.wallet(mk).createAndSignTx({
      msgs: [transferMsg],
    });

    /**
     * 진행중... 이경을 경우에만 토큰 전송 예정
     */
    if (isWin) {
      const txResult = await lcd.tx.broadcastSync(signedTx);
      console.log(txResult.txhash);
    }

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
