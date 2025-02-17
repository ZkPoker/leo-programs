import {
  Card,
  CardLeo,
  PlayerStatus,
  PlayerStatusLeo,
  AuthState,
  AuthStateLeo,
  Player,
  PlayerLeo,
  GameState,
  GameStateLeo
} from "../types/access_control";
import {
  leo2js,
  tx,
  parseJSONLikeString
} from "@doko-js/core";
import {
  PrivateKey
} from "@provablehq/sdk"


export function getCard(card: CardLeo): Card {
  const result: Card = {
    suit: leo2js.u8(card.suit),
    card_value: leo2js.u8(card.card_value),
  }
  return result;
}

export function getPlayerStatus(playerStatus: PlayerStatusLeo): PlayerStatus {
  const result: PlayerStatus = {
    status: leo2js.u8(playerStatus.status),
  }
  return result;
}

export function getAuthState(authState: AuthStateLeo): AuthState {
  const result: AuthState = {
    owner: leo2js.address(authState.owner),
    nonce: leo2js.u128(authState.nonce),
    _nonce: leo2js.group(authState._nonce),
  }
  return result;
}


export function decryptAuthState(authState: tx.RecordOutput < AuthState > | string, privateKey: string): AuthState {
  const encodedRecord: string = typeof authState === 'string' ? authState : authState.value;
  const decodedRecord: string = PrivateKey.from_string(privateKey).to_view_key().decrypt(encodedRecord);
  const result: AuthState = getAuthState(parseJSONLikeString(decodedRecord));

  return result;
}

export function getPlayer(player: PlayerLeo): Player {
  const result: Player = {
    id: leo2js.field(player.id),
    add: leo2js.address(player.add),
    secret_hash: leo2js.field(player.secret_hash),
    chips: leo2js.u128(player.chips),
  }
  return result;
}

export function getGameState(gameState: GameStateLeo): GameState {
  const result: GameState = {
    public_cards: leo2js.array(gameState.public_cards, leo2js.Card),
    round: leo2js.u8(gameState.round),
    players: leo2js.array(gameState.players, leo2js.Player),
    current_turn: leo2js.u8(gameState.current_turn),
  }
  return result;
}