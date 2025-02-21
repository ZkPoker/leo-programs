import {
  Card,
  CardLeo,
  EncryptedCard,
  EncryptedCardLeo,
  ShuffleEncryptParams,
  ShuffleEncryptParamsLeo,
  Player,
  PlayerLeo,
  GameState,
  GameStateLeo
} from "../types/pre_game";
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

export function getEncryptedCardLeo(encryptedCard: EncryptedCard): EncryptedCardLeo {
  const result: EncryptedCardLeo = {
    c0: js2leo.group(encryptedCard.c0),
    c1: js2leo.group(encryptedCard.c1),
  }
  return result;
}

export function getShuffleEncryptParamsLeo(shuffleEncryptParams: ShuffleEncryptParams): ShuffleEncryptParamsLeo {
  const result: ShuffleEncryptParamsLeo = {
      agg_pk: js2leo.group(shuffleEncryptParams.agg_pk),
      enc_cards1: js2leo.array(shuffleEncryptParams.enc_cards1, js2leo.EncryptedCard),
      enc_cards2: js2leo.array(shuffleEncryptParams.enc_cards2, js2leo.EncryptedCard),
      perm_matrix1: js2leo.array(shuffleEncryptParams.perm_matrix1, js2leo.[u8),
        perm_matrix2: js2leo.array(shuffleEncryptParams.perm_matrix2, js2leo.[u8),
          random_vector1: js2leo.array(shuffleEncryptParams.random_vector1, js2leo.scalar),
          random_vector2: js2leo.array(shuffleEncryptParams.random_vector2, js2leo.scalar),
          player_encryption1: js2leo.array(shuffleEncryptParams.player_encryption1, js2leo.EncryptedCard),
          player_encryption2: js2leo.array(shuffleEncryptParams.player_encryption2, js2leo.EncryptedCard),
        }
        return result;
      }

      export function getPlayerLeo(player: Player): PlayerLeo {
        const result: PlayerLeo = {
          id: js2leo.field(player.id),
          addr: js2leo.address(player.addr),
        }
        return result;
      }

      export function getGameStateLeo(gameState: GameState): GameStateLeo {
        const result: GameStateLeo = {
          public_cards: js2leo.array(gameState.public_cards, js2leo.Card),
          round: js2leo.u8(gameState.round),
          players: js2leo.array(gameState.players, js2leo.Player),
          small_blind: js2leo.u64(gameState.small_blind),
          big_blind: js2leo.u64(gameState.big_blind),
          min_buy_in: js2leo.u64(gameState.min_buy_in),
          max_buy_in: js2leo.u64(gameState.max_buy_in),
          current_turn: js2leo.u8(gameState.current_turn),
          game_seed: js2leo.u128(gameState.game_seed),
        }
        return result;
      }