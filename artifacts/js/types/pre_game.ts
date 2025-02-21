import {
  z
} from "zod";
import {
  leoAddressSchema,
  leoPrivateKeySchema,
  leoViewKeySchema,
  leoTxIdSchema,
  leoScalarSchema,
  leoFieldSchema,
  leoBooleanSchema,
  leoU8Schema,
  leoU16Schema,
  leoU32Schema,
  leoU64Schema,
  leoU128Schema,
  leoGroupSchema,
  leoRecordSchema,
  leoTxSchema,
  leoSignatureSchema,
  LeoArray,
  LeoAddress,
  ExternalRecord,
  tx
} from "@doko-js/core";

export interface Card {
  suit: number;
  card_value: number;
}

export const leoCardSchema = z.object({
  suit: leoU8Schema,
  card_value: leoU8Schema,
});
export type CardLeo = z.infer < typeof leoCardSchema > ;

export interface EncryptedCard {
  c0: bigint;
  c1: bigint;
}

export const leoEncryptedCardSchema = z.object({
  c0: leoGroupSchema,
  c1: leoGroupSchema,
});
export type EncryptedCardLeo = z.infer < typeof leoEncryptedCardSchema > ;

export interface ShuffleEncryptParams {
  agg_pk: bigint;
  enc_cards1: Array < undefined > ;
  enc_cards2: Array < undefined > ;
  perm_matrix1: Array < undefined > ;
  perm_matrix2: Array < undefined > ;
  random_vector1: Array < bigint > ;
  random_vector2: Array < bigint > ;
  player_encryption1: Array < undefined > ;
  player_encryption2: Array < undefined > ;
}

export const leoShuffleEncryptParamsSchema = z.object({
      agg_pk: leoGroupSchema,
      enc_cards1: z.array(leoEncryptedCardSchema).length(32),
      enc_cards2: z.array(leoEncryptedCardSchema).length(20),
      perm_matrix1: z.array(leo[u8Schema).length(32),
        perm_matrix2: z.array(leo[u8Schema).length(20),
          random_vector1: z.array(leoScalarSchema).length(32),
          random_vector2: z.array(leoScalarSchema).length(20),
          player_encryption1: z.array(leoEncryptedCardSchema).length(32),
          player_encryption2: z.array(leoEncryptedCardSchema).length(20),
        });
      export type ShuffleEncryptParamsLeo = z.infer < typeof leoShuffleEncryptParamsSchema > ;

      export interface Player {
        id: bigint;
        addr: LeoAddress;
      }

      export const leoPlayerSchema = z.object({
        id: leoFieldSchema,
        addr: leoAddressSchema,
      });
      export type PlayerLeo = z.infer < typeof leoPlayerSchema > ;

      export interface GameState {
        public_cards: Array < undefined > ;
        round: number;
        players: Array < undefined > ;
        small_blind: bigint;
        big_blind: bigint;
        min_buy_in: bigint;
        max_buy_in: bigint;
        current_turn: number;
        game_seed: bigint;
      }

      export const leoGameStateSchema = z.object({
        public_cards: z.array(leoCardSchema).length(5),
        round: leoU8Schema,
        players: z.array(leoPlayerSchema).length(10),
        small_blind: leoU64Schema,
        big_blind: leoU64Schema,
        min_buy_in: leoU64Schema,
        max_buy_in: leoU64Schema,
        current_turn: leoU8Schema,
        game_seed: leoU128Schema,
      });
      export type GameStateLeo = z.infer < typeof leoGameStateSchema > ;