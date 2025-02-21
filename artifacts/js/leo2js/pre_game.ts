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

export function getEncryptedCard(encryptedCard: EncryptedCardLeo): EncryptedCard {
  const result: EncryptedCard = {
    c0: leo2js.group(encryptedCard.c0),
    c1: leo2js.group(encryptedCard.c1),
  }
  return result;
}

export function getShuffleEncryptParams(shuffleEncryptParams: ShuffleEncryptParamsLeo): ShuffleEncryptParams {
  const result: ShuffleEncryptParams = {
      agg_pk: leo2js.group(shuffleEncryptParams.agg_pk),
      enc_cards1: leo2js.array(shuffleEncryptParams.enc_cards1, leo2js.EncryptedCard),
      enc_cards2: leo2js.array(shuffleEncryptParams.enc_cards2, leo2js.EncryptedCard),
      perm_matrix1: leo2js.array(shuffleEncryptParams.perm_matrix1, leo2js.[u8),
        perm_matrix2: leo2js.array(shuffleEncryptParams.perm_matrix2, leo2js.[u8),
          random_vector1: leo2js.array(shuffleEncryptParams.random_vector1, leo2js.scalar),
          random_vector2: leo2js.array(shuffleEncryptParams.random_vector2, leo2js.scalar),
          player_encryption1: leo2js.array(shuffleEncryptParams.player_encryption1, leo2js.EncryptedCard),
          player_encryption2: leo2js.array(shuffleEncryptParams.player_encryption2, leo2js.EncryptedCard),
        }
        return result;
      }

      export function getPlayer(player: PlayerLeo): Player {
        const result: Player = {
          id: leo2js.field(player.id),
          addr: leo2js.address(player.addr),
        }
        return result;
      }

      export function getGameState(gameState: GameStateLeo): GameState {
        const result: GameState = {
          public_cards: leo2js.array(gameState.public_cards, leo2js.Card),
          round: leo2js.u8(gameState.round),
          players: leo2js.array(gameState.players, leo2js.Player),
          small_blind: leo2js.u64(gameState.small_blind),
          big_blind: leo2js.u64(gameState.big_blind),
          min_buy_in: leo2js.u64(gameState.min_buy_in),
          max_buy_in: leo2js.u64(gameState.max_buy_in),
          current_turn: leo2js.u8(gameState.current_turn),
          game_seed: leo2js.u128(gameState.game_seed),
        }
        return result;
      }