import {
  tx
} from "@doko-js/core";
import * as records from "../types/access_control";


export type Access_controlAuthenticateTransition = tx.ExecutionReceipt < [tx.Transition < [], 'access_control', 'authenticate' > , ] >