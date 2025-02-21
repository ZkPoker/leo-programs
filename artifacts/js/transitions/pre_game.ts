import {
  tx
} from "@doko-js/core";
import * as records from "../types/pre_game";


export type Pre_gameMainTransition = tx.ExecutionReceipt < [tx.Transition < [tx.PrivateOutput], 'pre_game', 'main' > , ] >