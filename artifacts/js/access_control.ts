import {
  AuthState,
  GameState,
  PlayerStatus
} from "./types/access_control";
import {
  getAuthStateLeo,
  getGameStateLeo,
  getPlayerStatusLeo
} from "./js2leo/access_control";
import {
  getAuthState,
  getGameState,
  getPlayerStatus
} from "./leo2js/access_control";
import {
  ContractConfig,
  zkGetMapping,
  LeoAddress,
  LeoRecord,
  js2leo,
  leo2js,
  ExternalRecord,
  ExecutionMode,
  ExecutionContext,
  CreateExecutionContext,
  TransactionResponse
} from "@doko-js/core";
import {
  BaseContract
} from "../../contract/base-contract";
import {
  TransactionModel
} from "@provablehq/sdk";
import * as receipt from "./transitions/access_control";

export class Access_controlContract extends BaseContract {

  constructor(config: Partial < ContractConfig > = {
    mode: ExecutionMode.LeoRun
  }) {
    super({
      ...config,
      appName: 'access_control',
      fee: '0.01',
      contractPath: 'artifacts/leo/access_control',
      isImportedAleo: false
    });
  }
  async authenticate(r0: string, r1: LeoAddress, r2: AuthState): Promise < TransactionResponse < TransactionModel & receipt.Access_controlAuthenticateTransition, [] >> {
    const r0Leo = js2leo.signature(r0);
    const r1Leo = js2leo.address(r1);
    const r2Leo = js2leo.json(getAuthStateLeo(r2));

    const params = [r0Leo, r1Leo, r2Leo]
    const result = await this.ctx.execute('authenticate', params);
    return result
  }

  async Table(key: bigint, defaultValue ? : GameState): Promise < GameState > {
    const keyLeo = js2leo.field(key);

    const params = [keyLeo]
    const result = await zkGetMapping(
      this.config,
      'Table',
      params[0],
    );

    if (result != null)
      return getGameState(result);
    else {
      if (defaultValue != undefined) return defaultValue;
      throw new Error(`Table returned invalid value[input: ${key}, output: ${result}`);
    }
  }

  async Players(key: bigint, defaultValue ? : Array < undefined > ): Promise < Array < undefined >> {
    const keyLeo = js2leo.field(key);

    const params = [keyLeo]
    const result = await zkGetMapping(
      this.config,
      'Players',
      params[0],
    );

    if (result != null)
      return leo2js.array(result, leo2js.Player);
    else {
      if (defaultValue != undefined) return defaultValue;
      throw new Error(`Players returned invalid value[input: ${key}, output: ${result}`);
    }
  }

  async TableMainPotId(key: bigint, defaultValue ? : bigint): Promise < bigint > {
    const keyLeo = js2leo.field(key);

    const params = [keyLeo]
    const result = await zkGetMapping(
      this.config,
      'TableMainPotId',
      params[0],
    );

    if (result != null)
      return leo2js.field(result);
    else {
      if (defaultValue != undefined) return defaultValue;
      throw new Error(`TableMainPotId returned invalid value[input: ${key}, output: ${result}`);
    }
  }

  async TableMainPot(key: bigint, defaultValue ? : bigint): Promise < bigint > {
    const keyLeo = js2leo.field(key);

    const params = [keyLeo]
    const result = await zkGetMapping(
      this.config,
      'TableMainPot',
      params[0],
    );

    if (result != null)
      return leo2js.field(result);
    else {
      if (defaultValue != undefined) return defaultValue;
      throw new Error(`TableMainPot returned invalid value[input: ${key}, output: ${result}`);
    }
  }

  async RoundId(key: bigint, defaultValue ? : PlayerStatus): Promise < PlayerStatus > {
    const keyLeo = js2leo.field(key);

    const params = [keyLeo]
    const result = await zkGetMapping(
      this.config,
      'RoundId',
      params[0],
    );

    if (result != null)
      return getPlayerStatus(result);
    else {
      if (defaultValue != undefined) return defaultValue;
      throw new Error(`RoundId returned invalid value[input: ${key}, output: ${result}`);
    }
  }


}