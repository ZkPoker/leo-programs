// The 'access_control' program.
program access_control.aleo {
    // We cap the maximum number of players per table at 10
    const MAX_PLAYERS: u8 = 10u8;

    // Representation of a card
    struct Card {
        // 0 - Heart, 1 - Diamond, 2 - Spade, 3 - Claver
        suit: u8,
        // [1, 14] where 1 represents Ace. Follows sequentially.
        // value zero represents un-dealt community card
        card_value: u8,
    }

    // Mapping of table identifier with table state
    mapping Table: field => GameState;
    
    // Mapping of table id with the players
    // we allow a max 10 players per table
    mapping Players: field => [Player; 10];

    // Mapping of table id with the mainpot identifier.
    mapping TableMainPotId: field => field;

    // Mapping of mainpot id with mainpot info
    mapping TableMainPot: field => field;

    // round id = hash(table_id | round )
    mapping RoundId: field => PlayerStatus;

    // 0 - fold
    // 1 - active
    // 2 - All-in
    struct PlayerStatus {
        status: u8,
    }
    record HoleCard {
        owner: address,
        card: Card,
    }

    record AuthState {
        owner: address,
        nonce: u128,
    }

    struct GameState {
        // Community cards 
        public_cards: [Card; 5],
        // 0 - first round, 1 - flip, 2 - turn, 3 - river
        round: u8,
        players: [Player; 10],
        //mainpot: MainPot,
        //sidepot: SidePot,
        //pre_flop: PreFlopRound,
        //Flop: FlopRound,
        //turn: TurnRound,
        //river: RiverRound,
        current_turn: u8,
    }

    struct Player {
        id: field,
        add: address,
        // player must provide the secret every time he makes a play  
        secret_hash: field,
        // chip is a 1:1 mapping with aleo credits
        chips: u128,
    }

    /*struct SidePot {
    }

    struct MainPot {}

    struct PreFlopRound {}

    struct FlopRound {}

    struct TurnRound {}

    struct RiverRound {}

    transition verify_action(
        private auth: AuthState,
        public action: field,  // e.g., "bet", "fold"
        public action_params: ActionParams, // TODO: Implement Action types
        signature: signature
    ) -> AuthState {
        // Verify the signature
        let signable = BHP256::hash_to_field(action, action_params, auth.nonce);
        assert(signature.verify(auth.owner, signable));

        // Increment nonce to prevent replay
        let updated_auth = AuthState {
            owner: auth.owner,
            nonce: auth.nonce + 1u128
        };

        return updated_auth;
    }
    
    struct AllInNotification {

    }

    struct CallNotification {

    }

    struct RaiseNotification {

    }

    struct FoldNotification {

    }

    struct SidePotCreateNotification {

    }


    // Can be used by frontend to create
    struct MainPotCreateNotification {

    }
    */

    // this must be used whenever the player accesses or updates the game state.
    // and the nonce must be incremented to prevent reusing the signatures.
    transition authenticate(sig: signature, addr: address, signable: AuthState) {
        assert(sig.verify(addr, signable.nonce));
    }
}