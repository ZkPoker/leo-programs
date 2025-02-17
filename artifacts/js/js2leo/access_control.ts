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
  js2leo
} from "@doko-js/core";


export function getCardLeo(card: Card): CardLeo {
  const result: CardLeo = {
    suit: js2leo.u8(card.suit),
    card_value: js2leo.u8(card.card_value),
  }
  return result;
}

export function getPlayerStatusLeo(playerStatus: PlayerStatus): PlayerStatusLeo {
  const result: PlayerStatusLeo = {
    status: js2leo.u8(playerStatus.status),
  }
  return result;
}

export function getAuthStateLeo(authState: AuthState): AuthStateLeo {
  const result: AuthStateLeo = {
    owner: js2leo.privateField(js2leo.address(authState.owner)),
    nonce: js2leo.privateField(js2leo.u128(authState.nonce)),
    _nonce: js2leo.publicField(js2leo.group(authState._nonce)),
  }
  return result;
}

export function getPlayerLeo(player: Player): PlayerLeo {
  const result: PlayerLeo = {
    id: js2leo.field(player.id),
    add: js2leo.address(player.add),
    secret_hash: js2leo.field(player.secret_hash),
    chips: js2leo.u128(player.chips),
  }
  return result;
}

export function getGameStateLeo(gameState: GameState): GameStateLeo {
  const result: GameStateLeo = {
    public_cards: js2leo.array(gameState.public_cards, js2leo.Card),
    round: js2leo.u8(gameState.round),
    players: js2leo.array(gameState.players, js2leo.Player),
    current_turn: js2leo.u8(gameState.current_turn),
  }
  return result;
}