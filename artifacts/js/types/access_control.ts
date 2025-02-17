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

export interface PlayerStatus {
  status: number;
}

export const leoPlayerStatusSchema = z.object({
  status: leoU8Schema,
});
export type PlayerStatusLeo = z.infer < typeof leoPlayerStatusSchema > ;

export interface AuthState {
  owner: LeoAddress;
  nonce: bigint;
  _nonce: bigint;
}

export const leoAuthStateSchema = z.object({
  owner: leoAddressSchema,
  nonce: leoU128Schema,
  _nonce: leoGroupSchema,
});
export type AuthStateLeo = z.infer < typeof leoAuthStateSchema > ;

export interface Player {
  id: bigint;
  add: LeoAddress;
  secret_hash: bigint;
  chips: bigint;
}

export const leoPlayerSchema = z.object({
  id: leoFieldSchema,
  add: leoAddressSchema,
  secret_hash: leoFieldSchema,
  chips: leoU128Schema,
});
export type PlayerLeo = z.infer < typeof leoPlayerSchema > ;

export interface GameState {
  public_cards: Array < undefined > ;
  round: number;
  players: Array < undefined > ;
  current_turn: number;
}

export const leoGameStateSchema = z.object({
  public_cards: z.array(leoCardSchema).length(5),
  round: leoU8Schema,
  players: z.array(leoPlayerSchema).length(10),
  current_turn: leoU8Schema,
});
export type GameStateLeo = z.infer < typeof leoGameStateSchema > ;