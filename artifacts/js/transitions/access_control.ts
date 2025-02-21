import {
  tx
} from "@doko-js/core";
import * as records from "../types/access_control";


export type Access_controlVeify_encrypted_shuffleTransition = tx.ExecutionReceipt < [tx.Transition < [], 'access_control', 'veify_encrypted_shuffle' > , ] >
  export type Access_controlStart_gameTransition = tx.ExecutionReceipt < [tx.Transition < [tx.PrivateOutput, tx.FutureOutput], 'access_control', 'start_game' > , ] >
  export type Access_controlAuthenticateTransition = tx.ExecutionReceipt < [tx.Transition < [], 'access_control', 'authenticate' > , ] >